import { useEffect } from "react";
import { useDataContext } from "../context/dataContext";

import { Container, Grid2 } from "@mui/material";

export default function LearnPage() {
  const { fetchGetRandomWord } = useDataContext();
  useEffect(fetchGetRandomWord, []);

  return (
    <main>
      <Container maxWidth="xl">
        {/* Title */}
        <Grid2 sx={{ textAlign: "center" }}>
          <h1>Impara</h1>
        </Grid2>
      </Container>
    </main>
  );
}
