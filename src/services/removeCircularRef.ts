export function removeCircularReferences(obj, seen = new Set()) {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) {
        return undefined; // Returning undefined will remove the circular reference
      }
      seen.add(obj);
      if (Array.isArray(obj)) {
        return obj.map(item => removeCircularReferences(item, seen));
      }
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = removeCircularReferences(obj[key], seen);
        }
      }
      seen.delete(obj); // Allow this object to be processed again in a different branch
      return newObj;
    }
    return obj;
  }