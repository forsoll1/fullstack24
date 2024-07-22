## 0.4: uusi muistiinpano
```mermaid
graph TD;
    A[Selain]-->|Lomake lähetetään POST-metodilla osoitteeseen https://studies.cs.helsinki.fi/exampleapp/new_note, \nlomakkeeseen syötetty viesti löytyy palvelimelle lähetetyn datan kentästä 'note'|B[Palvelin];
    B--> |Palvelin vastaa statuskoodilla 302, jolla selain ohjataan tekemaan GET-pyyntö osoitteeseen /exampleapp/notes|C[Selain];
    C--> |Selain tekee GET-pyynnön em. osoitteeseen| D[Palvelin];
    D--> |Palvelin vastaa statuskoodilla 200 ja lähettää sivun HTML-sisällön| E[Selain];
    E--> |HTML-tiedosto sisältää viitteen CSS-tiedostoon, joten selain pyytää sitä GET-metodilla palvelimelta|F[Palvelin];
    E--> |HTML-tiedosto sisältää viitteen js-tiedostoon, joten selain pyytää sitä GET-metodilla palvelimelta|F;
    F--> |Palvelin lähettää pyydetyt tiedostot selaimelle|G[Selain];
    G--> |Selain suorittaa saadun javascript-koodin, se sisältää GET-pyynnön osoitteseen /exampleapp/data.json|H[Palvelin]
    H--> |Palvelin lähettää vastauksena json-tiedoston, jonka pohjalta selaimen lataama js-koodi \nlisää tiedostoon tallennetun sisällön HTML-koodiin|I[Selain]
```

## 0.5: Single Page App
```mermaid
graph TD;
    A[Selain]--> |Selain tekee GET-pyynnön osoitteeseen https://studies.cs.helsinki.fi/exampleapp/spa| B[Palvelin];
    B--> |Palvelin vastaa statuskoodilla 200 ja lähettää sivun HTML-sisällön| C[Selain];
    C--> |HTML-tiedosto sisältää viitteen CSS-tiedostoon, joten selain pyytää sitä GET-metodilla palvelimelta|D[Palvelin];
    C--> |HTML-tiedosto sisältää viitteen js-tiedostoon, joten selain pyytää sitä GET-metodilla palvelimelta|D;
    D--> |Palvelin lähettää pyydetyt tiedostot selaimelle|E[Selain];
    E--> |Selain suorittaa saadun javascript-koodin, se sisältää GET-pyynnön osoitteseen /exampleapp/data.json|F[Palvelin]
    F--> |Palvelin lähettää vastauksena json-tiedoston, jonka pohjalta selaimen lataama js-koodi \nlisää tiedostoon tallennetun sisällön HTML-koodiin|G[Selain]
```

## 0.6: Uusi muistiinpano
```mermaid
graph TD;
    A[Selain]-->|Lomake lähetetään POST-metodilla osoitteeseen https://studies.cs.helsinki.fi/exampleapp/new_note_spa, \nlomakkeeseen syötetty viesti löytyy palvelimelle lähetetyn datan kentästä 'content'|B[Palvelin];
    B--> |Palvelin vastaa statuskoodilla 201 'Created'|C[Selain];
```