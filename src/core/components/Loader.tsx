import { Backdrop, Box } from "@mui/material";

const Loader = ({ open }: any) => {
  return (
    <Backdrop
      sx={{ 
        color: "#fff", 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        '.loader': {
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'inline-block',
          borderTop: '4px solid #FFF',
          borderRight: '4px solid transparent',
          boxSizing: 'border-box',
          animation: 'rotation 1s linear infinite',
          position: 'relative',
        },
        '.loader::after': {
          content: '""',
          boxSizing: 'border-box',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          borderLeft: '4px solid #FF3D00',
          borderBottom: '4px solid transparent',
          animation: 'rotation 0.5s linear infinite reverse',
        },
        '@keyframes rotation': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
      open={open}
    >
      <Box className="loader"></Box>
    </Backdrop>
  );
};

export default Loader;
