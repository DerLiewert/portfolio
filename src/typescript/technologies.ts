export interface Technology {
  id: string;
  title: string;
  icon: {
    default: string;
    theme?: {
      dark: string;
      light: string;
    };
  };
}
