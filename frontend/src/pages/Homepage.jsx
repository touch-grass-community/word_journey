import { Container, Grid2 } from "@mui/material";

export default function Homepage() {
  return (
    <main>
      <Container maxWidth="xl">
        {/* Title */}
        <Grid2 sx={{ textAlign: "center" }}>
          <h1>Homepage</h1>
        </Grid2>
      </Container>
    </main>
  );
}
