export class ZIndexUtils {
  private static zIndexes: { key: string; value: number }[] = [];

  private static gerenateZIndex(key: string, baseZIndex: number): number {
    const lastZIndex =
      this.zIndexes.length > 0
        ? this.zIndexes[this.zIndexes.length - 1]
        : { key, value: baseZIndex };
    const newZIndex =
      lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 2;

    this.zIndexes.push({ key, value: newZIndex });

    return newZIndex;
  }

  public static set(key: string, el: HTMLElement, baseZIndex: number) {
    if (el) {
      el.style.zIndex = String(this.gerenateZIndex(key, baseZIndex));
    }
  }
}
