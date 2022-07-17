export interface RepositoryPropsTypes {
  name: string;
  description?: string | null;
  url: string;
  stars: number;
  id: number;
  onStarChange: (id: number) => void;
}
