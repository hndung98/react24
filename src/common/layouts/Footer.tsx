import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Copyright from "../components/Copyright";
import TextField from "../components/TextField";
import Typography from "../components/Typography";

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "warning.main",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

const LANGUAGES = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "vi",
    name: "Tiếng Việt",
  },
];

export default function AppFooter() {
  // change language
  const changeLanguage = (lng: string) => {
    console.log(lng);
  };

  const location = useLocation();
  const currentMenuItem = location.pathname.split("/")[2];

  return (
    <Typography
      component="footer"
      sx={{
        display: "flex",
        bgcolor: "#b5dbff",
        marginTop: ["home"].includes(currentMenuItem) ? "150px" : "15px",
      }}
    >
      <Container sx={{ my: 4, display: "flex" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box
                  component="a"
                  href="https://fb.com/"
                  sx={iconStyle}
                  target="_blank"
                >
                  <img src="/src/common/assets/images/appFooterFacebook.png" alt="Facebook" />
                </Box>
                <Box
                  component="a"
                  href="https://twitter.com/"
                  sx={iconStyle}
                  target="_blank"
                >
                  <img src="/src/common/assets/images/appFooterTwitter.png" alt="Twitter" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright text="" url="http://localhost:5173/"/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/ocr/terms/">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/ocr/privacy/">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                changeLanguage(event.target.value);
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {"Icons made by "}
              <Link href="/ocr/freepik" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {" from "}
              <Link href="/ocr/flaticon" rel="sponsored" title="Flaticon">
                Flaticon
              </Link>
              {" is licensed by "}
              <Link
                href="/ocr/licenses"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                SGVN
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
