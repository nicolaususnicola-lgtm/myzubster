# Roadmap N4K48 - MyZubster Metaverse

Stato: proposta operativa  
Responsabile del profilo: N4K48 (`nicolaususnicola-lgtm`)  
Mondo iniziale: Neon Plaza  
Ultimo aggiornamento: 2 settembre 2026

## Obiettivo

Portare N4K48 da una sessione guest a un profilo Metaverse persistente e verificabile, collegato volontariamente all'account GitHub e riconosciuto dal backend MyZubster.

La fotografia personale non blocca l'MVP: fino alla consegna del file originale viene usato un fallback grafico neutro.

## Legenda

- `DONE`: completato e verificato.
- `IN PROGRESS`: implementazione o verifica in corso.
- `NEXT`: prossimo lavoro prioritario.
- `PLANNED`: previsto dopo le attività prioritarie.
- `BLOCKED`: richiede una decisione o una risorsa esterna.

## Stato sintetico

| Area | Stato | Evidenza o prossimo controllo |
| --- | --- | --- |
| Endpoint di autenticazione | DONE | Flusso registrazione/login individuato e verificato localmente |
| JWT Metaverse | DONE | Middleware e chiamata autenticata implementati nel fork |
| Repository personale | DONE | Modifiche pubblicate su `nicolaususnicola-lgtm/myzubster` |
| Documento di progetto | DONE | Documento Word pubblicato nel repository |
| Profilo persistente N4K48 | NEXT | Creazione/recupero del personaggio per account autenticato |
| Login GitHub nel frontend | NEXT | Collegamento OAuth e ritorno all'applicazione |
| Presenza condivisa | PLANNED | Join, online, movimento, emote e uscita verificati con più sessioni |
| Fotografia personale | BLOCKED | In attesa del file originale dal telefono; non blocca l'MVP |

## Fase 1 - Identità e accesso

Priorità: P0  
Stato: IN PROGRESS

- [x] Individuare gli endpoint effettivi di registrazione e login.
- [x] Verificare il formato JSON richiesto.
- [x] Estrarre e utilizzare il JWT senza mostrare token completi o segreti.
- [x] Proteggere la verifica JWT con algoritmo esplicito.
- [ ] Collegare il pulsante di accesso GitHub nel frontend.
- [ ] Gestire logout, scadenza e token non valido senza degradazione silenziosa a guest.

Criterio di completamento: un utente autenticato viene riconosciuto dal backend; una richiesta anonima resta `guest-unverified`; un token non valido riceve `401`.

## Fase 2 - Profilo persistente N4K48

Priorità: P0  
Stato: NEXT

- [ ] Creare il modello del profilo Metaverse collegato all'utente.
- [ ] Salvare `displayName`, `characterName`, `archetype` e `worldId`.
- [ ] Creare N4K48 una sola volta e recuperarlo nei login successivi.
- [ ] Esporre solo i campi pubblici necessari.
- [ ] Usare un fallback neutro per `avatarUrl`.
- [ ] Aggiungere la fotografia solo dopo approvazione esplicita del file originale.

Criterio di completamento: dopo un nuovo login il backend restituisce lo stesso personaggio N4K48 senza duplicati.

## Fase 3 - Ingresso in Neon Plaza

Priorità: P0  
Stato: PLANNED

- [ ] Collegare il profilo persistente a `/api/metaverse/join`.
- [ ] Ignorare identità dichiarate dal client quando esiste una sessione autenticata.
- [ ] Restituire `identityMode: account-authenticated` o `account-linked`.
- [ ] Mostrare nome pubblico e stato verificato nel mondo.
- [ ] Mantenere separati guest e account autenticati.

Criterio di completamento: N4K48 entra in Neon Plaza con identità derivata dal server e non modificabile tramite payload client.

## Fase 4 - Presenza e interazioni

Priorità: P1  
Stato: PLANNED

- [ ] Verificare conteggio `online` con presenze attive e scadenza.
- [ ] Sincronizzare movimento e orientamento.
- [ ] Verificare emote, chat e uscita dal mondo.
- [ ] Gestire riconnessioni senza duplicare la presenza.
- [ ] Eseguire un test con almeno due sessioni contemporanee.

Criterio di completamento: entrambe le sessioni vedono uno stato coerente e il conteggio online torna corretto dopo l'uscita.

## Fase 5 - Sicurezza, privacy e qualità

Priorità: P0 prima del rilascio  
Stato: IN PROGRESS

- [x] Non pubblicare `JWT_SECRET`, token completi o file `.env`.
- [x] Mantenere la fotografia personale fuori dal repository finché non è approvata.
- [ ] Aggiungere test automatici per autenticazione, world e join.
- [ ] Verificare che log e risposte siano sanitizzati.
- [ ] Documentare revoca del collegamento GitHub.
- [ ] Definire moderazione e rimozione delle immagini pubbliche.
- [ ] Eseguire smoke test nell'ambiente scelto.

Criterio di completamento: test verdi, nessun segreto nei log o nel repository e procedura di rollback documentata.

## Fase 6 - Demo e rilascio controllato

Priorità: P1  
Stato: PLANNED

- [ ] Scegliere ambiente demo o staging.
- [ ] Configurare variabili segrete soltanto nel provider di deployment.
- [ ] Attivare health check e monitoraggio essenziale.
- [ ] Pubblicare una demo riproducibile.
- [ ] Raccogliere feedback senza dichiarare adozione o partnership non dimostrate.

Criterio di completamento: la demo è raggiungibile, monitorata e riproducibile; eventuali limiti sono dichiarati chiaramente.

## Sequenza consigliata

1. Completare il profilo persistente N4K48.
2. Collegare il login GitHub nel frontend.
3. Collegare il profilo autenticato al join di Neon Plaza.
4. Eseguire test con due sessioni e verificare `online`.
5. Chiudere i controlli di sicurezza e privacy.
6. Preparare una demo controllata.
7. Inserire la fotografia originale quando sarà disponibile.

## Definition of Done dell'MVP

L'MVP è completato quando:

- N4K48 accede con un account verificato;
- il backend restituisce il profilo persistente corretto;
- `identityMode` distingue chiaramente account e guest;
- Neon Plaza mostra una presenza condivisa coerente;
- token, segreti e dati privati non compaiono nei log o nel repository;
- i test automatici e lo smoke test principale risultano superati;
- in assenza della fotografia viene mostrato un fallback neutro.

## Decisioni aperte

- Ambiente iniziale: demo locale, staging o produzione.
- Provider e configurazione OAuth GitHub.
- Modello definitivo del personaggio e URL pubblico degli asset.
- Durata della presenza online e strategia di heartbeat.
- Politica di revoca, moderazione e sostituzione dell'immagine personale.

