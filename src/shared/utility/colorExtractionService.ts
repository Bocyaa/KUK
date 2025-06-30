import ColorThief from 'colorthief';

interface ColorCache {
  [recipeId: string]: string;
}

class ColorExtractionService {
  private cache: ColorCache = {};
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.loadCacheFromStorage();
  }

  private loadCacheFromStorage() {
    try {
      const stored = localStorage.getItem('recipe-colors-cache');
      if (stored) {
        this.cache = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load color cache:', error);
    }
  }

  private saveCacheToStorage() {
    try {
      localStorage.setItem('recipe-colors-cache', JSON.stringify(this.cache));
    } catch (error) {
      console.error('Failed to save color cache:', error);
    }
  }

  private async extractColorFromImage(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);

          // Darken the color
          const darkenFactor = 0.7;
          const darkenedColor = [
            Math.floor(color[0] * darkenFactor),
            Math.floor(color[1] * darkenFactor),
            Math.floor(color[2] * darkenFactor),
          ];

          // Convert to hex
          const toHex = (n: number) => n.toString(16).padStart(2, '0');
          const hexColor = `#${toHex(darkenedColor[0])}${toHex(darkenedColor[1])}${toHex(darkenedColor[2])}`;

          resolve(hexColor);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));

      // Use smaller image for faster processing
      const smallerUrl = imageUrl.includes('?')
        ? `${imageUrl}&w=100&h=100`
        : `${imageUrl}?w=100&h=100`;

      img.src = smallerUrl;
    });
  }

  async initializeColors(recipes: any[]): Promise<void> {
    if (this.isInitialized || this.initPromise) {
      return this.initPromise || Promise.resolve();
    }

    this.initPromise = this.processRecipes(recipes);
    await this.initPromise;
    this.isInitialized = true;
  }

  private async processRecipes(recipes: any[]): Promise<void> {
    const uncachedRecipes = recipes.filter(
      (recipe) => recipe.image_url && !this.cache[recipe.id],
    );

    if (uncachedRecipes.length === 0) return;

    // Process in batches to avoid overwhelming the browser
    const batchSize = 5;
    const batches = [];

    for (let i = 0; i < uncachedRecipes.length; i += batchSize) {
      batches.push(uncachedRecipes.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const promises = batch.map(async (recipe) => {
        try {
          const color = await this.extractColorFromImage(recipe.image_url);
          this.cache[recipe.id] = color;
        } catch (error) {
          console.error(
            `Failed to extract color for recipe ${recipe.id}:`,
            error,
          );
          this.cache[recipe.id] = '#646464'; // fallback
        }
      });

      await Promise.all(promises);

      // Save progress after each batch
      this.saveCacheToStorage();

      // Small delay to prevent blocking UI
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  getColor(recipeId: string): string {
    return this.cache[recipeId] || '#646464';
  }

  hasColor(recipeId: string): boolean {
    return !!this.cache[recipeId];
  }

  async updateRecipeColor(recipeId: string, imageUrl: string): Promise<string> {
    try {
      const color = await this.extractColorFromImage(imageUrl);
      this.cache[recipeId] = color;
      this.saveCacheToStorage();
      return color;
    } catch (error) {
      console.error(`Failed to update color for recipe ${recipeId}:`, error);
      const fallbackColor = '#646464';
      this.cache[recipeId] = fallbackColor;
      return fallbackColor;
    }
  }

  clearCache() {
    this.cache = {};
    localStorage.removeItem('recipe-colors-cache');
  }
}

export const colorExtractionService = new ColorExtractionService();
