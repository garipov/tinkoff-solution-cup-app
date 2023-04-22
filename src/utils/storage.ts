interface StorageValue<TValue> {
  value: TValue;
  version: number;
}

const defaultVersion = 1;

class Storage<TValue> {
  constructor(private _key: string) {}

  get(version = defaultVersion) {
    const value = localStorage.getItem(this._key);

    if (!value) return null;

    try {
      const parsed = JSON.parse(value) as StorageValue<TValue>;

      // potentionally it can be migrated
      if (parsed.version !== version) return null;

      return parsed.value as TValue;
    } catch (e) {
      return null;
    }
  }

  set(value: TValue, version = defaultVersion) {
    const storageValue: StorageValue<TValue> = {
      value,
      version,
    };

    localStorage.setItem(this._key, JSON.stringify(storageValue));
  }
}

export const storage = {
  new<TValue>(key: string) {
    return new Storage<TValue>(key);
  },
};
