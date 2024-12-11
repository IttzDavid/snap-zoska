import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = { title: 'O nás | David IG' };

export default function About() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        O nás
      </Typography>
      <Typography variant="body1" paragraph>
        Vitajte na našej platforme! <strong>David IG</strong> je moderná sociálna sieť navrhnutá pre ľudí, ktorí chcú zdieľať svoje momenty, spájať sa s ostatnými a objavovať nové inšpirácie.
      </Typography>
      <Typography variant="h6">Naša vízia</Typography>
      <Typography variant="body1" paragraph>
        Našou víziou je vytvoriť bezpečné a inkluzívne miesto, kde každý môže byť autentický, zdieľať svoje zážitky a budovať zmysluplné vzťahy. Sme presvedčení, že sociálne siete môžu byť pozitívnou silou na prepájanie ľudí po celom svete.
      </Typography>
      <Typography variant="h6">Čo ponúkame</Typography>
      {/* Removed <Typography> wrapper for the <ul> */}
      <ul>
        <li>
          <Typography variant="body1">Jednoduché zdieľanie fotografií a videí.</Typography>
        </li>
        <li>
          <Typography variant="body1">Personalizovaný obsah podľa vašich záujmov.</Typography>
        </li>
        <li>
          <Typography variant="body1">Bezpečné súkromné správy a skupinové konverzácie.</Typography>
        </li>
        <li>
          <Typography variant="body1">Nástroje na objavovanie nových ľudí a komunitných aktivít.</Typography>
        </li>
      </ul>
      <Typography variant="h6">Kontakt</Typography>
      <Typography variant="body1">
        Ak máte otázky, pripomienky alebo nápady, neváhajte nás kontaktovať na e-mailovej adrese: podpora@davidig.com.
      </Typography>
    </Container>
  );
}
