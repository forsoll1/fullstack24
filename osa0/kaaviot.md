```mermaid
graph TD;
    Browser-->Server: lomakkeen lähetys;
    Lomake lähetetään POST-metodilla osoitteeseen https://studies.cs.helsinki.fi/exampleapp/new_note, lomakkeeseen syötetty viesti löytyy palvelimelle lähetetyn datan kentästä "note";
    Server-->Browser: Palvelimen vastaus;
    Palvelin vastaa statuskoodilla 302, jolla selain ohjataan tekemaan GET-pyyntö osoitteeseen /exampleapp/notes;
    Browser-->Server: Selain tekee GET-pyynnön em. osoitteeseen;
    Server-->Browser: Palvelin vastaa statuskoodilla 200 ja lähettää sivun HTML-sisällön;
```