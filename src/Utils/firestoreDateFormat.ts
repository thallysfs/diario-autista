import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if(timestamp){
        const date = new Date(timestamp.toDate());

        const day = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        const hour = date.toLocaleTimeString('pt-BR');

        const dayF = day.split("/", 10)
        return `${dayF[1]}/${dayF[0]}/${dayF[2]} às ${hour}`;
    }
}
