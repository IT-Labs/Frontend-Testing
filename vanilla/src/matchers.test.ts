describe('matchers', () => {
  describe('numberts', () => {
    it('should work', () => {
      const value = 2 + 2;
      expect(value).toBeGreaterThan(3);
      expect(value).toBeGreaterThanOrEqual(3.5);
      expect(value).toBeLessThan(5);
      expect(value).toBeLessThanOrEqual(4.5);

      expect(value).toBe(4);
      expect(value).toEqual(4);
    });
  });


  describe('true or not', () => {
    it('should work', () => {
      const t = true;
      expect(t).toBe(true);
      expect(t).toBeTruthy();
      expect(t).toBeDefined();
    });

    it('zero', () => {
      const n = 0;
      expect(n).toBeFalsy();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).not.toBeNull();
    });

    it('null', () => {
      const v = null;

      expect(v).toBeNull();
      expect(v).toBeFalsy();
      expect(v).toBeDefined();
    })
  });

  describe('string', () => {
    it('should work', () => {
      const v = 'Voislav';

      expect(v).toEqual('Voislav');
      expect(v).toContain('slav');
      expect(v).toBeDefined();
      expect(v).toBeTruthy();
    })
  });

  describe('arrays', () => {
    it('abc', () => {
      const arr = ['one', 'two', 'three'];

      expect(arr).toContain('two');
      expect(arr).toEqual(expect.arrayContaining(['two', 'three']));
      expect(arr).not.toEqual(expect.arrayContaining(['random-abc', 'three']));
    });
  });
})