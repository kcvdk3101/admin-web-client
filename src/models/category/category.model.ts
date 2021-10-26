export interface Images {
  id: string;
  ownerId: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  depth: number;
  children?: ChilrenCategory[];
  images: Images[];
}

export interface ChilrenCategory extends Category {
  parentId: string;
  children?: ChilrenCategory[];
  images: Images[];
}
