import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from '../../ripple/ripple.directive';
import { IconComponent } from '../../icon/icon.component';
import { TemplateComponent } from '../../template/template.component';

interface PaginatorState {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
  totalRecords: number;
}

export interface PageEvent extends Omit<PaginatorState, 'totalRecords'> {}

interface SelectItem {
  label: string;
  value: number;
}

@Component({
  selector: 'iv-paginator',
  standalone: true,
  imports: [CommonModule, RippleDirective, IconComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() alwaysShow = true;
  @Input() showCurrentPageReport = false;
  @Input() currentPageReportTemplate = '{currentPage} of {totalPages}';
  @Input() totalRecords = 0;
  @Input() rows = 0;
  @Input() first = 0;
  @Input() showFirstLastIcon = true;
  @Input() pageLinkSize = 5;
  @Input() showJumpToPageDropdown = false;
  @Input() showPageLinks = true;
  @Input() locale?: string;

  firstPageLinkIconTemplate?: TemplateRef<TemplateComponent>;
  previousPageLinkIconTemplate?: TemplateRef<TemplateComponent>;

  pageLinks: number[] = [];
  pageItems?: SelectItem[];
  paginatorState?: PaginatorState;

  @Output() onPageChange: EventEmitter<PaginatorState> =
    new EventEmitter<PaginatorState>();

  get currentPageReport() {
    return this.currentPageReportTemplate
      .replace('{currentPage}', String(this.currentPage()))
      .replace('{totalPages}', String(this.getPageCount()))
      .replace('{first}', String(this.totalRecords > 0 ? this.first + 1 : 0))
      .replace('{last}', String(Math.min(this.first + this.rows, this.totalRecords)))
      .replace('{rows}', String(this.rows))
      .replace('{totalRecords}', String(this.totalRecords));
  }

  ngOnInit(): void {
    this.updatePaginatorState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalRecords']) {
      this.updatePageLinks();
      this.updatePaginatorState();
      this.updateFirst();
    }

    if (changes['first']) {
      this.first = changes['first'].currentValue;
      this.updatePageLinks();
      this.updatePaginatorState();
    }

    if (changes['rows']) {
      this.updatePageLinks();
      this.updatePaginatorState();
    }
  }

  onPageLinkClick(event: Event, page: number): void {
    this.changePage(page);
    event.preventDefault();
  }

  currentPage(): number {
    return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
  }

  getPageCount(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }

  getPage(): number {
    return Math.floor(this.first / this.rows);
  }

  getLocalization(digit: number): string | undefined {
    const numerals = [
      ...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210),
    ].reverse();
    const index = new Map(numerals.map((d, i) => [i, d]));
    if (digit > 9) {
      const numbers = String(digit).split('');
      return numbers.map((number) => index.get(Number(number))).join('');
    } else {
      return index.get(digit);
    }
  }

  isFirstPage(): boolean {
    return this.getPage() === 0;
  }

  empty(): boolean {
    return this.getPageCount() === 0;
  }

  calculatePageLinkBoundaries(): { start: number; end: number } {
    const numberOfPages = this.getPageCount();
    const visiblePages = Math.min(this.pageLinkSize, numberOfPages);

    // calculate range, keep current in middle if necessary
    let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2));
    const end = Math.min(numberOfPages - 1, start + visiblePages - 1);

    // check when approaching to last page
    const delta = this.pageLinkSize - (end - start + 1);
    start = Math.max(0, start - delta);

    return { start, end };
  }

  updateFirst(): void {
    const page = this.getPage();
    if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
      Promise.resolve(null).then(() => this.changePage(page - 1));
    }
  }

  updatePageLinks(): void {
    this.pageLinks = [];
    const boundaries = this.calculatePageLinkBoundaries();

    for (let i = boundaries.start; i <= boundaries.end; i++) {
      this.pageLinks.push(i + 1);
    }

    if (this.showJumpToPageDropdown) {
      this.pageItems = [];
      for (let i = 0; i < this.getPageCount(); i++) {
        this.pageItems.push({ label: String(i + 1), value: i });
      }
    }
  }

  updatePaginatorState(): void {
    this.paginatorState = {
      page: this.getPage(),
      pageCount: this.getPageCount(),
      rows: this.rows,
      first: this.first,
      totalRecords: this.totalRecords,
    };
  }

  changePageToFirst(event: Event): void {
    if (!this.isFirstPage()) {
      this.changePage(0);
    }

    event.preventDefault();
  }

  changePageToPrev(event: Event): void {
    this.changePage(this.getPage() - 1);
    event.preventDefault();
  }

  changePage(page: number): void {
    const pageCount = this.getPageCount();

    if (page >= 0 && page < pageCount) {
      this.first = this.rows * page;
      const state: PaginatorState = {
        page: page,
        first: this.first,
        rows: this.rows,
        pageCount: pageCount,
        totalRecords: this.totalRecords,
      };

      this.updatePageLinks();

      this.onPageChange.emit(state);
      this.updatePaginatorState();
    }
  }
}
