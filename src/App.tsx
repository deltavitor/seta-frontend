import "@fontsource-variable/inter";
import "./App.scss";
import { Map, StartupCard } from "./modules";
import { useFindNotificationLocations } from "./hooks";

function App() {

    const {
        data: notificationLocations,
        isLoading,
    } = useFindNotificationLocations();

    const notificationLocationCount = notificationLocations?.length || 0;

    return (
        <div>
            { isLoading && <h1>Loading...</h1> }
            { notificationLocationCount == 0 && !isLoading && <StartupCard></StartupCard> }
            { notificationLocations && notificationLocationCount > 0 && !isLoading && <Map notificationLocations={notificationLocations}></Map> }
        </div>
    )
}

export default App;
