import locationList from '../src/location-list.js';
import saveUser from './functions/saveUser.js';
import loadUser from './functions/loadUser.js';
import createStatusBar from './functions/create-status-bar.js';
import updateStatusBar from './functions/update-status-bar.js';
import muteToggle from './functions/mute-toggle.js';

const locationLinks = document.getElementById('map');

const soundtrack = new Audio('../assets/audio/map.mp3');
soundtrack.play();

muteToggle(soundtrack);

const user = loadUser();
createStatusBar(user);

for(let i = 0; i < locationList.length; i++) {
    const location = locationList[i];
    const link = document.createElement('a');
    const icon = document.createElement('img');
    icon.src = location.icon;

    link.addEventListener('click', function() {
        if(user.receivedClues === location.requiredClues) {
            link.href = 'location.html?name=' + encodeURIComponent(location.name);
        } else {
            user.daysLeft--;
            const promptArea = document.getElementById('prompt');
            const wrongGuessPrompt = document.createElement('p');
            wrongGuessPrompt.id = 'wrong-guess-prompt';
            wrongGuessPrompt.textContent = 'Wrong Location... You\'re wasting time. You lost a day. Think hard about your clues.';
            promptArea.appendChild(wrongGuessPrompt);
            updateStatusBar(user);
            saveUser(user);
        }

        if(user.daysLeft === 0) {
            window.location = 'end.html';
        }
    });
    
    link.id = location.name;
    link.appendChild(icon);
    locationLinks.appendChild(link);
}
