import { ObjectUtils } from './object-utils';

describe('Object Utils', () => {
  it('test isNotEmpty and return true if have a array with information', () => {
    const menu = {
      label: 'Processar Pré-Fatura',
      icon: 'receipt_long',
      items: [
        {
          label: 'Frete',
          icon: 'local_shipping',
        },
        {
          label: 'Operações Florestais',
          icon: 'forest',
        },
      ],
    };

    expect(ObjectUtils.isNotEmpty(menu.items)).toBe(true);
  });

  it('test isNotEmpty and return false with array is not array', () => {
    const menu = {
      label: 'Processar Pré-Fatura',
      icon: 'receipt_long',
      items: [],
    };

    expect(ObjectUtils.isNotEmpty(menu?.items)).toBe(false);
  });
});
