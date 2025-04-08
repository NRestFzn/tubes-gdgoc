interface IconProps {
  className?: string
}

export const DashboardIcon: React.FC<IconProps> = ({className}): React.ReactElement => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z" stroke="#000" strokeWidth="2" />
    <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z" stroke="#000" strokeWidth="2" />
    <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z" stroke="#000" strokeWidth="2" />
  </svg>
);

export const SalesIcon: React.FC<IconProps> = ({className}): React.ReactElement => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="2" fill="none" />
    <path d="M12 6V18" stroke="#000" strokeWidth="2" />
    <path d="M15 8c-1-2-6-2-6 1s5 2 5 5-5 3-5 0" stroke="#000" strokeWidth="2" fill="none" />
  </svg>
);

export const StockIcon: React.FC<IconProps> = ({className}): React.ReactElement => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 11L12 3L21 11" stroke="black" strokeWidth="2" fill="none" />
    <rect x="6" y="11" width="12" height="10" stroke="black" strokeWidth="2" fill="none" />
    <rect x="10" y="15" width="4" height="6" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({className}): React.ReactElement => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M14 3H6C5.47 3 5 3.47 5 4V20C5 20.53 5.47 21 6 21H14" stroke="black" strokeWidth="2" fill="none" />
    <path d="M17 16L21 12L17 8" stroke="black" strokeWidth="2" fill="none" />
    <path d="M9 12H21" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export const LoginIcon: React.FC<IconProps> = ({ className }): React.ReactElement => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 3H18C18.53 3 19 3.47 19 4V20C19 20.53 18.53 21 18 21H10" stroke="black" strokeWidth="2" fill="none" />
    <path d="M3 12H15" stroke="black" strokeWidth="2" fill="none" />
    <path d="M11 8L15 12L11 16" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }): React.ReactElement => (
  <svg className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
