export const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }
  
  export const unslugify = (text: string): string => {
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
      .trim();
  };
  
  export const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim();
  };
  