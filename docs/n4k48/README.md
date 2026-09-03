# N4K48 — MyZubster Metaverse

N4K48 è il profilo persistente e verificabile di Nicola all'interno del Metaverse MyZubster. Il primo mondo supportato è **Neon Plaza**, uno spazio condiviso nel quale utenti autenticati e visitatori guest rimangono chiaramente distinti.

> **Stato del progetto:** MVP in sviluppo e validazione. Il profilo persistente, il riconoscimento JWT e il join autenticato sono implementati e coperti da test locali. OAuth GitHub nel frontend, test multiutente e distribuzione staging restano da completare.

## Indice

- [Obiettivo](#obiettivo)
- [Funzionalità](#funzionalità)
- [Stato attuale](#stato-attuale)
- [Architettura](#architettura)
- [Flusso di autenticazione](#flusso-di-autenticazione)
- [API Metaverse](#api-metaverse)
- [Avvio locale](#avvio-locale)
- [Test](#test)
- [Sicurezza e privacy](#sicurezza-e-privacy)
- [Roadmap](#roadmap)
- [Contribuire](#contribuire)
- [Licenza](#licenza)

## Obiettivo

Il progetto porta N4K48 da una sessione anonima a un personaggio associato a un account MyZubster verificato. L'identità pubblica del personaggio viene determinata dal server e non dai dati liberamente dichiarati dal browser.

Gli obiettivi principali sono:

- mantenere lo stesso personaggio tra accessi differenti;
- separare sempre utenti autenticati e guest;
- impedire la sostituzione dell'identità tramite payload client;
- supportare presenza, movimento, chat ed emote in Neon Plaza;
- esporre soltanto dati pubblici strettamente necessari;
- preparare una base verificabile per una futura demo pubblica.

## Funzionalità

### Profilo persistente

Il modello `MetaverseCharacter` collega un personaggio all'utente autenticato e conserva i dati essenziali:

- nome visualizzato;
- nome del personaggio;
- archetipo;
- mondo di appartenenza;
- stato dell'identità;
- eventuali riferimenti GitHub pubblici autorizzati;
- ultimo accesso.

La creazione è idempotente: accessi successivi recuperano il personaggio esistente invece di crearne duplicati.

### Identità verificata

Il backend riconosce tre condizioni distinte:

- `guest-unverified`: sessione senza account verificato;
- `account-authenticated`: richiesta autenticata con JWT valido;
- `account-linked`: personaggio persistente collegato all'account.

Un token non valido viene rifiutato con `401`; non viene trasformato silenziosamente in una sessione guest.

### Neon Plaza

Il mondo iniziale è `neon-plaza`, con capacità configurata a 250 presenze. Le API supportano:

- ingresso e uscita;
- snapshot dello stato del mondo;
- sincronizzazione periodica;
- movimento;
- chat temporanea;
- emote;
- stream degli eventi;
- health check aggregato senza elenco privato dei giocatori.

## Stato attuale

| Componente | Stato | Evidenza |
| --- | --- | --- |
| Registrazione e login MyZubster | Completato | Endpoint e payload verificati |
| Middleware JWT | Completato | Account e guest distinti lato server |
| Profilo persistente N4K48 | Completato | Creazione e recupero idempotente testati |
| Join autenticato | Completato | Identità client ignorata quando esiste un account collegato |
| Suite autenticata | Completato localmente | 4 suite, 22 test superati il 3 settembre 2026 |
| OAuth GitHub nel frontend | Prossimo passo | Callback backend presente; integrazione UI da completare |
| Presenza con due sessioni reali | Pianificato | Richiede test multiutente |
| Demo staging | Pianificato | Ambiente e segreti da configurare |
| Fotografia originale | In attesa | Non blocca l'MVP; viene usato un fallback neutro |

Il superamento dei test locali dimostra il comportamento nelle condizioni testate; non equivale a una distribuzione pubblica o a una validazione completa in produzione.

## Architettura

```text
Browser / frontend
        |
        | login o registrazione
        v
API MyZubster -----> JWT firmato
        |                 |
        |                 v
        |        Authorization: Bearer <token>
        |                 |
        v                 v
Profilo utente ---> MetaverseCharacter
                          |
                          v
                    Neon Plaza
                          |
              +-----------+-----------+
              |           |           |
           Presence      Chat       Events
```

Componenti principali:

- `src/controllers/authController.js`: registrazione, login, verifica GitHub e provisioning del personaggio;
- `src/middleware/auth.js`: autenticazione delle API principali;
- `backend/src/middleware/auth.js`: autenticazione opzionale del Metaverse;
- `backend/src/models/MetaverseCharacter.js`: profilo persistente;
- `backend/src/models/MetaversePresence.js`: presenza temporanea nel mondo;
- `backend/src/models/MetaverseChatMessage.js`: messaggi temporanei;
- `backend/src/routes/metaverse.js`: API di Neon Plaza;
- `frontend/src/pages/MetaversePage.js`: interfaccia React del mondo;
- `frontend/src/api/metaverse.js`: client delle API Metaverse.

## Flusso di autenticazione

```text
Registrazione o login
        ↓
Verifica delle credenziali
        ↓
Emissione del JWT
        ↓
Richiesta con header Authorization
        ↓
Verifica firma, algoritmo e scadenza
        ↓
Recupero del profilo persistente
        ↓
Ingresso come account-linked
```

Per una richiesta autenticata:

```http
Authorization: Bearer <JWT>
```

Token, `JWT_SECRET`, credenziali OAuth e file `.env` non devono essere copiati in issue, commit, screenshot o log pubblici.

## API Metaverse

Base path: `/api/metaverse`

| Metodo | Endpoint | Scopo |
| --- | --- | --- |
| `GET` | `/health` | Stato aggregato del servizio |
| `GET` | `/world` | Snapshot del mondo e identità corrente |
| `POST` | `/join` | Ingresso nel mondo |
| `POST` | `/sync` | Sincronizzazione della sessione |
| `GET` | `/events` | Eventi del mondo in streaming |
| `POST` | `/move` | Movimento del personaggio |
| `POST` | `/chat` | Invio di un messaggio temporaneo |
| `POST` | `/emote` | Attivazione di un'emote |
| `POST` | `/leave` | Chiusura della sessione |

Esempio di lettura autenticata del mondo:

```bash
curl http://localhost:3010/api/metaverse/world \
  -H "Authorization: Bearer <JWT>"
```

Esempio di risposta ridotta:

```json
{
  "success": true,
  "identityMode": "account-authenticated",
  "online": 0,
  "user": {
    "id": "<user-id>",
    "username": "<username>",
    "role": "user"
  }
}
```

## Avvio locale

### Requisiti

- Node.js 20;
- npm o pnpm;
- MongoDB 6, oppure Docker con Docker Compose;
- un file `.env` locale con valori di sviluppo sicuri.

### Installazione diretta

```bash
git clone https://github.com/nicolaususnicola-lgtm/myzubster.git
cd myzubster
npm install
npm start
```

Il gateway principale usa la porta configurata dall'ambiente. Nella configurazione Docker fornita, il backend è raggiungibile da host su `http://localhost:3010` e il frontend su `http://localhost:3000`.

### Avvio con Docker

```bash
docker compose up --build
```

Servizi principali della composizione:

- MongoDB;
- backend;
- frontend;
- automazione AI;
- gateway onion opzionale.

Le password e le chiavi predefinite sono adatte esclusivamente allo sviluppo locale e devono essere sostituite prima di qualsiasi distribuzione condivisa.

## Test

La verifica mirata del flusso autenticato comprende:

- `backend/src/routes/metaverse-auth.test.js`;
- `backend/src/routes/metaverse.test.js`;
- `tests/socialIdentityService.test.js`;
- `test/metaverseAuthenticatedUi.test.js`.

Esecuzione:

```bash
npm test -- --runInBand \
  tests/socialIdentityService.test.js \
  test/metaverseAuthenticatedUi.test.js \
  backend/src/routes/metaverse-auth.test.js \
  backend/src/routes/metaverse.test.js
```

Ultimo risultato locale registrato il 3 settembre 2026:

```text
Test Suites: 4 passed, 4 total
Tests:       22 passed, 22 total
Snapshots:   0 total
```

Prima del rilascio restano necessari un test con almeno due browser contemporanei e uno smoke test nell'ambiente staging scelto.

## Sicurezza e privacy

Il progetto segue questi principi:

- identità autenticata derivata dal server;
- token non valido rifiutato, senza downgrade a guest;
- algoritmi JWT ammessi esplicitamente;
- segreti solo nell'ambiente di esecuzione;
- risposte pubbliche ridotte ai campi necessari;
- presenza e chat con conservazione temporanea;
- fotografia personale non pubblicata senza approvazione esplicita;
- health check aggregato, senza dati privati dei giocatori.

Prima di una demo pubblica occorre inoltre verificare la sanitizzazione completa dei log, documentare revoca e rollback e configurare limiti appropriati per richieste e contenuti.

Per segnalazioni di sicurezza, seguire la procedura descritta in [`SECURITY.md`](../../SECURITY.md). Non aprire issue pubbliche contenenti vulnerabilità sfruttabili o segreti.

## Roadmap

La pianificazione pubblica e lo stato aggiornato sono disponibili in [`ROADMAP_N4K48_METAVERSE.md`](../../ROADMAP_N4K48_METAVERSE.md).

Priorità correnti:

1. integrare e pubblicare le correzioni locali della suite autenticata;
2. completare OAuth GitHub e la gestione della sessione nel frontend;
3. verificare presenza e conteggio online con due sessioni;
4. completare controlli di sicurezza e privacy;
5. distribuire una demo staging riproducibile;
6. aggiungere la fotografia originale solo quando autorizzata.

## Contribuire

Contributi tecnici, documentazione e test sono benvenuti. Prima di proporre modifiche:

1. leggere [`CONTRIBUTING.md`](../../CONTRIBUTING.md) e [`CODE_OF_CONDUCT.md`](../../CODE_OF_CONDUCT.md);
2. aprire o scegliere un'issue con ambito chiaro;
3. lavorare su un branch dedicato;
4. aggiungere test proporzionati alla modifica;
5. evitare dati personali, token e credenziali nei commit;
6. aprire una pull request descrivendo comportamento, verifiche e limiti.

Una pull request o un test superato non implica automaticamente rilascio, adozione, partnership o approvazione esterna.

## Licenza

Il progetto segue la licenza del repository MyZubster. Consultare [`LICENSE`](../../LICENSE) per condizioni e attribuzione.

---

**Repository:** [nicolaususnicola-lgtm/myzubster](https://github.com/nicolaususnicola-lgtm/myzubster)  
**Roadmap pubblica:** [ROADMAP_N4K48_METAVERSE.md](../../ROADMAP_N4K48_METAVERSE.md)  
**Profilo:** [N4K48](https://github.com/nicolaususnicola-lgtm)
