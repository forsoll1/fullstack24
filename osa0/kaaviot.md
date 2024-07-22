```mermaid
graph TD;
    A[Selain]-->|Lomake lähetetään POST-metodilla osoitteeseen https://studies.cs.helsinki.fi/exampleapp/new_note, lomakkeeseen syötetty viesti löytyy palvelimelle lähetetyn datan kentästä "note"|B[Palvelin];
    B--> |Palvelin vastaa statuskoodilla 302, jolla selain ohjataan tekemaan GET-pyyntö osoitteeseen /exampleapp/notes|C[Selain];
    C--> |Selain tekee GET-pyynnön em. osoitteeseen| D[Palvelin];
    D--> |Palvelin vastaa statuskoodilla 200 ja lähettää sivun HTML-sisällön| E[Selain];
```