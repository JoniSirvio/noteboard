# Noteboard / Notelist

## Mitä tein ja miksi
Inspiroituneena vanhanaikaisista muistilapuista, joita työpöydälläni on, halusin tehdä web-ohjelman, joka voisi korvata ne ja jonka voisin pitää auki toisella näytölläni taustalla. Laajensin ohjelmaa myös tekemällä listamaisen sivun, johon otin inspiraatiota perinteisistä kauppalistoista.

## Käyttö

### Noteboard:
Voit luoda uusia muistilappuja kirjoittamalla ensimmäiseen kenttään "Enter your note" ja julkaisemalla sen painamalla "Add"-painiketta. Lappuja voi muokata painamalla niitä, ja ne voi poistaa hoveroimalla ja painamalla punaisesta raksista (CTA). Lappuja voi myös siirrellä haluamaansa järjestykseen pitämällä niitä pohjassa ja viemällä hiirellä haluttuun kohtaan.

### Notelist:
Voit luoda uusia listauksia kirjoittamalla ensimmäiseen kenttään "Enter your note" ja julkaisemalla sen painamalla "Add"-painiketta. Listauksien tekstejä ei voi muokata luomisen jälkeen. Listauksen järjestystä voi muokata siirtelemällä niitä hiirellä. "To do" ja "Done" -sarakkeiden välillä niitä voi liikuttaa oikeassa reunassa olevista painikkeista "checkmark" ja "undo". "Done"-sarakkeesta voi poistaa listauksen painamalla punaista raksipainiketta. Valitettavasti "To do" -sarakkeesta ei voi vetää listauksia "Done"-sarakkeeseen, vaan tämän toiminnon toteutin pelkällä painikkeella.

### Vaihto Noteboardin ja Notelistin välillä:
Voit vaihtaa Noteboardin ja Notelistin välillä painamalla headerin H1-otsikon "logoa". Tämä ei ole ehkä UX:n kannalta paras ratkaisu, mutta tämä lähestymistapa kiinnosti minua ja halusin välttää tavallisen navigoinnin tekemistä.

Sekä Noteboard että Notelist tallentavat tiedot localStorageen.

## Ohjelmointikielet
Tein ohjelman JavaScriptillä, HTML:llä ja CSS:llä.

## Käyttöönotto / testaus
Voit ladata projektin repositoriostani ja käynnistää sen paikallisesti esimerkiksi Visual Studio Codella. Et tarvitse API-avaimia tai muita tunnisteita.
