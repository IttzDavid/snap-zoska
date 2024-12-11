// app/components/GdprView.tsx
"use client"; // Client-side only component

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GdprView() {
  const router = useRouter();

  const handleBackToRegistration = () => {
    router.push("/auth/registracia");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ochrana osobných údajov (GDPR)
      </Typography>
      <Typography variant="body1" paragraph>
        Vaše súkromie je pre nás dôležité. Táto stránka poskytuje informácie o tom, ako zhromažďujeme, spracovávame a chránime vaše osobné údaje v súlade s európskym nariadením GDPR.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Zhromažďované údaje
      </Typography>
      <Typography variant="body1">
        Môžeme zhromažďovať nasledujúce typy údajov;
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">Osobné údaje: meno, e-mailová adresa, telefónne číslo.</Typography>
        </li>
        <li>
          <Typography variant="body1">Technické údaje: IP adresa, cookies, údaje o prehliadači.</Typography>
        </li>
      </ul>
      <Typography variant="h6" gutterBottom>
        Vaše práva
      </Typography>
      <Typography variant="body1" paragraph>
        Máte právo na prístup k vašim údajom, ich opravu, vymazanie alebo obmedzenie ich spracovania. Ak máte otázky, kontaktujte nás.
      </Typography>
      <Button
        variant="outlined"
        onClick={handleBackToRegistration}
        sx={{ mt: 3, width: 'auto' }}  // Set width to 'auto' for smaller size
      >
        Späť na registráciu
      </Button>
    </Container>
  );
}
