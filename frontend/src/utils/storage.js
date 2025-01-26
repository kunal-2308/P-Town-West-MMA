const STORAGE_KEY = 'mma_boxing_scheduler';
const CURRENT_VERSION = '1.0.0';

export const saveToStorage = (data) => {
  try {
    const dataWithVersion = {
      ...data,
      version: CURRENT_VERSION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsedData = JSON.parse(data);
    
    // Version check and migration logic can be added here
    if (parsedData.version !== CURRENT_VERSION) {
      console.warn('Data version mismatch, migrations may be needed');
    }

    return parsedData;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};