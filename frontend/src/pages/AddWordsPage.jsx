import { useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Container,
  Select,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Grid2,
  List,
  ListItem,
  IconButton,
  DialogTitle,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function AddWordsPage() {
  const initialValues = {
    word: {
      nativeTranslations: [""],
      foreignWord: "",
      wordType: "",
      notes: "",
      exampleSentence: "",
    },
  };

  const [formNewWord, setFormNewWord] = useState(initialValues);

  const addNativeWord = () => {
    setFormNewWord({
      ...formNewWord,
      word: {
        ...formNewWord.word,
        nativeTranslations: [...formNewWord.word.nativeTranslations, ""],
      },
    });
  };

  const deleteNativeWord = (index) => {
    setFormNewWord({
      ...formNewWord,
      word: {
        ...formNewWord.word,
        nativeTranslations: [
          ...formNewWord.word.nativeTranslations.slice(0, index),
          ...formNewWord.word.nativeTranslations.slice(index + 1),
        ],
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormNewWord({
      ...formNewWord,
      word: {
        ...formNewWord.word,
        [name]: value,
      },
    });
  };

  const handleNativeWordsChange = (e, index) => {
    const { value } = e.target;
    const newNativeWords = [...formNewWord.word.nativeTranslations];
    newNativeWords[index] = value;

    setFormNewWord({
      ...formNewWord,
      word: {
        ...formNewWord.word,
        nativeTranslations: newNativeWords,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", formNewWord);
    setFormNewWord(initialValues);
  };

  return (
    <main>
      <Container maxWidth="xl">
        {/* Title */}
        <Grid2 sx={{ textAlign: "center" }}>
          <h1>Aggiungi una parola...</h1>
        </Grid2>

        {/* Form add new word */}
        <Grid2
          component="form"
          onSubmit={handleSubmit}
          container
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {/* Foreign Word */}
          <Grid2
            size={{ xs: 12, md: "grow" }}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <TextField
              id="new-word"
              label="Nuova Parola"
              placeholder="Inserisci nuova parola"
              sx={{ width: "100%" }}
              value={formNewWord.word.foreignWord}
              name="foreignWord"
              onChange={handleChange}
              required
            />
          </Grid2>

          <Grid2 sx={{ textAlign: "center", alignSelf: "center" }}>
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </Grid2>

          {/* Native Words */}
          <Grid2
            size={{ xs: 12, md: "grow" }}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            {/* Native Words List */}
            <List sx={{ width: "100%", paddingTop: 0, paddingBottom: 0 }}>
              {formNewWord.word.nativeTranslations.map((nativeWord, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    index === 0 ? (
                      <IconButton
                        onClick={addNativeWord}
                        edge="end"
                        aria-label="addNativeWord"
                      >
                        <AddIcon />
                      </IconButton>
                    ) : (
                      /* Delete native word button */
                      <IconButton
                        onClick={() => deleteNativeWord(index)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                  sx={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}
                >
                  <TextField
                    label="Traduzione Parola"
                    placeholder="Inserisci traduzione parola"
                    sx={{ width: "100%" }}
                    value={formNewWord.word.nativeTranslations[index]}
                    onChange={(e) => handleNativeWordsChange(e, index)}
                    required
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>

          {/* Notes */}
          <Grid2 size={12}>
            <TextField
              id="notes"
              label="Note parola"
              sx={{ width: "100%" }}
              multiline
              rows={4}
              placeholder="Inserisci note parola..."
              value={formNewWord.word.notes}
              name="notes"
              onChange={handleChange}
            />
          </Grid2>

          {/* Example */}
          <Grid2 size={12}>
            <TextField
              id="example"
              label="Esempio parola"
              sx={{ width: "100%" }}
              multiline
              rows={4}
              placeholder="Inserisci esempio parola..."
              value={formNewWord.word.exampleSentence}
              name="exampleSentence"
              onChange={handleChange}
            />
          </Grid2>

          {/* Word Type */}
          <Grid2 size={12}>
            <InputLabel id="type-label" htmlFor="wordType">
              Tipologia parola
            </InputLabel>
            <Select
              labelId="type-label"
              id="wordType"
              value={formNewWord.word.wordType}
              label="Tipologia parola"
              name="wordType"
              onChange={handleChange}
              required
            >
              <MenuItem value={"Noun"}>Nome</MenuItem>
              <MenuItem value={"Verb"}>Verbo</MenuItem>
              <MenuItem value={"Adjective"}>Aggettivo</MenuItem>
              <MenuItem value={"Pronoun"}>Pronome</MenuItem>
              <MenuItem value={"Preposition"}>Preposizione</MenuItem>
              <MenuItem value={"Conjunction"}>Congiunzione</MenuItem>
              <MenuItem value={"Article"}>Articolo</MenuItem>
            </Select>
          </Grid2>

          {/* Sending Button */}
          <Grid2 size={12} sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="success">
              Invia nuova parola
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </main>
  );
}
