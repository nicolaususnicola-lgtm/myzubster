# N4K48 — percorso MVP verso Neon Plaza

**Stato:** specifica MVP definita; integrazione e validazione end-to-end ancora da completare.

N4K48 è un'identità digitale persistente collegata volontariamente a un account GitHub e pensata per l'accesso al mondo condiviso **Neon Plaza** nell'ecosistema MyZubster.

Questa pagina descrive un percorso di implementazione. Non costituisce prova di deployment, adozione, partnership, vendita o identità legale verificata.

## Obiettivo dell'MVP

Il primo traguardo verificabile è permettere a N4K48 di:

1. autenticarsi tramite GitHub;
2. ricevere un profilo pubblico minimo e privo di dati sensibili;
3. entrare in Neon Plaza con un personaggio persistente;
4. uscire, autenticarsi nuovamente e ritrovare lo stesso personaggio;
5. mostrare uno stato account-linked verificato dal backend.

La fotografia personale non è necessaria per il primo rilascio: l'interfaccia deve prevedere un avatar neutro di fallback.

## Confini di identità e privacy

- Il collegamento GitHub è volontario.
- Il backend verifica l'autenticazione e rilascia la sessione applicativa.
- Email, token OAuth, segreti e dati non necessari non devono comparire nel profilo pubblico.
- L'identità account-linked non equivale a identità legale.
- Guest e account verificato devono essere distinti chiaramente.
- Revoca e disconnessione devono interrompere l'associazione futura senza inventare o conservare dati non necessari.

## Architettura minima

```text
GITHUB OAUTH
     ↓
VERIFICA SERVER-SIDE
     ↓
SESSIONE / JWT APPLICATIVO
     ↓
PROFILO PUBBLICO MINIMO
     ↓
PERSONAGGIO PERSISTENTE
     ↓
PRESENZA CONDIVISA IN NEON PLAZA
```

Il profilo pubblico può includere un identificatore applicativo, il nome visualizzato, l'handle GitHub autorizzato, `avatarUrl` o fallback neutro e lo stato di verifica. Non deve esporre credenziali o attributi privati.

## Roadmap verificabile

| Blocco | Risultato atteso | Stato |
|---|---|---|
| Identità | Login GitHub completato nel frontend e verificato dal backend | Da validare |
| Profilo | Profilo pubblico minimo con `avatarUrl` e fallback | Da implementare/validare |
| World | Accesso di N4K48 a Neon Plaza | Da validare |
| Presenza realtime | Presenza condivisa senza esporre dati sensibili | Da implementare/validare |
| QA | Smoke test registrazione, login, world e nuova sessione | Da eseguire |
| Lancio | Esperienza end-to-end documentata con evidenze riproducibili | Non ancora raggiunto |

## Gate di accettazione

L'MVP può essere dichiarato funzionante soltanto quando un test riproducibile dimostra che:

- il login GitHub funziona dall'interfaccia;
- il backend rifiuta token o sessioni non validi;
- il profilo pubblico non contiene email o token;
- il personaggio rimane associato allo stesso account dopo un nuovo login;
- guest e account-linked sono distinguibili;
- N4K48 entra realmente in Neon Plaza e la presenza è osservabile nelle condizioni dichiarate.

## Distribuzione commerciale

È in valutazione un percorso di vendita internazionale tramite un **Merchant of Record**, così che checkout, imposte indirette e gestione operativa dei pagamenti possano essere separati dal runtime MyZubster. Nessun fornitore, prezzo o modello commerciale è considerato approvato finché non viene selezionato e verificato esplicitamente.

Pagamento e autenticazione devono restare confini distinti: un acquisto non deve esporre credenziali GitHub e il provider di pagamento non deve diventare la fonte dell'identità pubblica nel mondo.

## Prossimi passi

1. completare il login GitHub nel frontend;
2. predisporre `avatarUrl` e fallback neutro;
3. eseguire smoke test di registrazione, login e accesso al world;
4. validare la persistenza del personaggio tra sessioni;
5. verificare la presenza condivisa in Neon Plaza;
6. pubblicare soltanto evidenze sanificate e riproducibili.

## Regola sulle dichiarazioni

**Specifica o roadmap ≠ implementazione. Test automatico ≠ deployment reale. Account-linked ≠ identità legale.**
