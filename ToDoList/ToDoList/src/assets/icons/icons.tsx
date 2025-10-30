import { useState } from "react";

const PencilIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        stroke: isHovered ? '#6C63FF' : '#8c8c8c',
        transition: 'fill 0.2s ease-in-out',
        fill: 'none'
      }}
    >
      <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" strokeLinecap="round" strokeLinejoin="round" />

    </svg>
  );
};

const BinIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        stroke: isHovered ? '#E50000' : '#8c8c8c',
        transition: 'fill 0.2s ease-in-out',
        fill: 'none'
      }}
    >
      <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" />
      <path d="M14.625 3.75H3.375" strokeLinecap="round" />
      <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" />
      <path d="M10.5 9V12.75" strokeLinecap="round" />
      <path d="M7.5 9V12.75" strokeLinecap="round" />
    </svg>
  );
};


const DetectiveIcon: React.FC = () => {
  return (
    <img src="/src/assets/icons/Detective.svg" alt="dots icon" />
  );
};

const PlusIcon: React.FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5 22.5C10.5 22.8978 10.658 23.2794 10.9393 23.5607C11.2206 23.842 11.6022 24 12 24C12.3978 24 12.7794 23.842 13.0607 23.5607C13.342 23.2794 13.5 22.8978 13.5 22.5V13.5H22.5C22.8978 13.5 23.2794 13.342 23.5607 13.0607C23.842 12.7794 24 12.3978 24 12C24 11.6022 23.842 11.2206 23.5607 10.9393C23.2794 10.658 22.8978 10.5 22.5 10.5H13.5V1.5C13.5 1.10218 13.342 0.720644 13.0607 0.43934C12.7794 0.158035 12.3978 0 12 0C11.6022 0 11.2206 0.158035 10.9393 0.43934C10.658 0.720644 10.5 1.10218 10.5 1.5V10.5H1.5C1.10218 10.5 0.720644 10.658 0.43934 10.9393C0.158035 11.2206 0 11.6022 0 12C0 12.3978 0.158035 12.7794 0.43934 13.0607C0.720644 13.342 1.10218 13.5 1.5 13.5H10.5V22.5Z" fill="#F7F7F7" />
    </svg>
  );
};



export { BinIcon, PencilIcon, DetectiveIcon, PlusIcon };