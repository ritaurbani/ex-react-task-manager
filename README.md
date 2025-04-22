Notes-

1. API-POST IN USETASK CUSTOM HOOK

-Se il backend risponde con:
json
{ "success": true, "task": { "id": 1, "title": "Comprare il latte" } }
Allora result diventa:
javascript
{ success: true, task: { id: 1, title: "Comprare il latte" } }

-Se invece il backend risponde con un errore:
json
{ "success": false, "message": "Il titolo è obbligatorio" }
Allora result diventa:
javascript
{ success: false, message: "Il titolo è obbligatorio" }

--ESEMPIO COMPLETO:
const addTask = async (newTask) => {
  // 1. Invii newTask al backend (senza ID, senza metadata)
  const response = await fetch(`${apiUrl}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title: "Comprare il latte" }) // Esempio
  });

  // 2. Il backend risponde con un JSON che ha questa forma:
  //    - Se successo: { success: true, task: { id: 5, title: "Comprare il latte", ... } }
  //    - Se errore:   { success: false, message: "Errore" }
  const result = await response.json();

  // 3. Se il backend dice "success: false", blocca tutto con l'errore
  if (!result.success) throw new Error(result.message);

  // 4. Se tutto ok, AGGIUNGI result.task (non newTask!) allo stato
  //    Perché result.task ha tutti i campi aggiunti dal backend
  setTasks(prev => [...prev, result.task]);
};
/////////////////////////////

--Customhook: useTask
Gestione con try/catch (più esplicita)
javascript
try {
  const response = await fetch(...);
  const result = await response.json();

  if (!result.success) throw new Error(result.message);

  setTasks(prev => [...prev, result.task]);
} catch (error) {
  console.error("Errore:", error.message);
}

////////////
--IN ADD TASK

3. Come funziona il flusso nel tuo codice

// 1. handleSubmit prepara i dati e gestisce il form
const handleSubmit = async (e) => {
  // ...
  const newTask = { title, description, status }; // 🛒 "Fai la spesa"

  try {
    // 2. Passa i dati a addTask ("delega il lavoro sporco")
    await addTask(newTask); // 📦 "Consegna il pacco"
    
    // 3. Solo se addTask ha successo:
    alert("Task creato!"); // ✅ "Notifica il successo"
    setTitle(""); // 🧹 "Pulisci la cucina"
  } catch (error) {
    alert(error.message); // ❌ "Gestisci incidenti"
  }
};

// 4. addTask (in un altro file/hook) gestisce la logica centrale
const addTask = async (newTask) => {
  const response = await fetch(...); // 🚚 "Spedisci il pacco"
  const result = await response.json();
  if (!result.success) throw new Error(result.message); // 🔴 "Se il pacco si rompe"
  setTasks(prev => [...prev, result.task]); // 📦 "Aggiorna l'inventario"
};
4. Quando è accettabile mettere tutto in handleSubmit?
Solo per componenti molto semplici (es. demo rapide):

javascript
// ✅ OK per piccole app (meno di 100 righe)
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(...); // Logica API direttamente qui
  // ... 5-10 righe al massimo ...
};

Analogia per capire meglio
Immagina un ristorante:

handleSubmit è il cameriere:

Prende l'ordine (newTask)

Porta i piatti al tavolo (alert)

Pulisce (setTitle(""))

addTask è il cuoco:

Cucina (fetch)

Verifica la qualità (result.success)

Aggiorna il menu (setTasks)

Se il cameriere cucinasse, il ristorante sarebbe ingovernabile!

///////////////////////////

--taskDetail

/task/:id  parametro che usiamo con useParams per capire dentro taskDetail in che task ci troviamo 

const [task, setTask] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const { id } = useParams();

useEffect(() => {
  const fetchTask = async () => {
    try {
      const res = await fetch(`${apiUrl}/tasks/${id}`);
      if (!res.ok) throw new Error('Task non trovato');
      const data = await res.json();
      setTask(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTask();
}, [id]);

if (loading) return <div>Caricamento...</div>;
if (error) return <h2>{error}</h2>;
if (!task) return <h2>Task non trovato</h2>;

///////////////////////////

--taskDetail --RemoveTask

1. Prima Versione: removeTask (Funzione "pura")
javascript
const removeTask = async (taskId) => {
  // 1. Chiamata API
  const response = await fetch(`${apiUrl}/tasks/${taskId}`, { method: "DELETE" });
  
  // 2. Leggi la risposta
  const result = await response.json();

  // 3. Se l'API segnala un errore, LANCIA l'errore
  if (!result.success) {
    throw new Error(result.message); // ⚠️ Non gestisci qui, passi il problema al chiamante
  }

  // 4. Se tutto ok, aggiorna lo stato
  setTasks(prev => prev.filter(task => task.id !== taskId));
};

Cosa hai fatto qui:

Creata una funzione riutilizzabile che:

Fa una richiesta API.

Non gestisce UI (alert, navigate, ecc.).

Lancia errori per il chiamante (throw).

2. Seconda Versione: handleDelete (Gestione UI)
javascript
const handleDelete = async (id) => {
  try {
    // 1. Chiama removeTask (operazione asincrona)
    //Il codice si "ferma" qui finché removeTask non termina
    //senza await alert sarebbe mostrato prima che l'operazione finisca).

    await removeTask(task.id); // 🔹 Aspetta il completamento

    // 2. Se removeTask ha successo:
    alert("Task has been successfully eliminated"); // UI feedback
    navigate("/"); // Reindirizzamento

  } catch (error) {
    // 3. Se removeTask fallisce:
    console.error(error); // Log tecnico
    alert(error.message); // Feedback all'utente
  }
};
Perché questa evoluzione?

Separazione dei compiti:

removeTask: Si occupa solo della logica cruda (API + stato).

handleDelete: Gestisce il flusso UI (feedback, navigazione).

Maggiore controllo:

Ora puoi decidere nel componente come reagire agli errori (es. alert, toast, navigate).

DIVISION OF TASK
Cosa succede in await removeTask(task.id)?
removeTask è una funzione separata (definita altrove, ad esempio in un context/hook).

handleDelete la chiama per delegare il lavoro sporco (API + aggiornamento stato).

await aspetta che removeTask finisca tutto il suo lavoro prima di procedere.

