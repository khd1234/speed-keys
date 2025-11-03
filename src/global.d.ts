// Global ambient declarations for non-TS assets
// Allows side-effect imports like `import './globals.css'` without TS2882

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
