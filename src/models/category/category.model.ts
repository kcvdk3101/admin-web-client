export interface CategoryAttribute {
  id: string;
  name: string;
  slug: string;
  depth: number;
}

export interface Images {
  id: string;
  ownerId: string;
  url: string;
}

export interface ChilrenCategory extends CategoryAttribute {
  parentId: string;
}

export interface Category extends CategoryAttribute {
  children?: ChilrenCategory[];
  images: Images[];
}
