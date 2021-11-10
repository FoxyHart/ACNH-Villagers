let villagersRepository = (function() {
    //added IIFE function
    
    let modalContainer = document.querySelector('#modal-container');
    //function for modal to pop up when a villager is selected
    function showModal(villagers) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);
    
    // header for name
        let titleElement = document.createElement('h1');
        titleElement.innerText = villagers.name.name-USen;
    //
        let speciesElement = document.createElement('p');
        speciesElement.innerText = 'Species: '  + villagers.species;
     
        let genderElement = document.createElement('p');
        genderElement.innerText = 'Gender: ' + villagers.gender;
    
        let personalityElement = document.createElement('p');
        personalityElement.innerText = 'Personality: ' + villagers.personality;
    
        let birthdayElement = document.createElement('p');
        birthdayElement.innerText = 'Birthday: ' +villagers.birthday;

        let imgElement = document.createElement('img')
        imgElement.src = villagers.image_uri
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(speciesElement);
        modal.appendChild(genderElement);
        modal.appendChild(personalityElement);
        modal.appendChild(birthdayElement);
        modal.appendChild(imgElement);
    
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }
    //function for modal removal
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }
    //hide modal by ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    // hide modal when clicked away from 
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    //end of modal
    let villagersList = [];
    let apiUrl = 'http://acnhapi.com/v1/villagers/';
    // API for villager and their stats
    
    function add(villagers) {
         villagersList.push (villagers);
    }
    function getAll() {
        return villagersList;
    }
    
    function addListItem (villagers) {
        let villagersContainer = document.querySelector('villagers-list');
        let listVillagers = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = villagers.name.name-USen; 
        button.classList.add('button-class');
        listVillagers.appendChild(button);
        villagersContainer.appendChild(listVillagers);
        button.addEventListener('click', function() {
            showDetails(villagers)
        });
    }
   /* fetch('http://acnhapi.com/v1/villagers/').then(function (response) {
      return response.json(); 
    }).then(function (villagersList) {
      console.log(villagersList);
      showModal(villagers); 
    }).catch(function () {
    });  // this pulled info to console */
     function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let villagers = {
              name: item.name,
              detailsUrl: item.url
            };
            add(villagers);
            console.log(villagers);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = image_uri;
          item.gender = details.gender;
          item.species = details.species;
          item.personality = details.personality;
          item.birthday = details.birthday;
        }).catch(function (e) {
          console.error(e);
        });
      }
      function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
          });
      }
    function showDetails (villagers) {
        loadDetails(villagers).then(function () {
            showModal(villagers);
        });
    } 
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
      };
    })();
    
 villagersRepository.loadList().then(function() {
     villagersRepository.getAll().forEach(function (villagers){
     villagersRepository.addListItem(villagers);
      });
    });