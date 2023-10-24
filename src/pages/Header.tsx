import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { search } from 'ionicons/icons';
import React, { useState } from 'react';

const Header: React.FC<{ setSearchInput: (value: string) => void, searchInput: string }> = ({ setSearchInput, searchInput }) => {
    const [expandSearchBar, setExpandSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChange = (event: CustomEvent) => {
        const value = event.detail.value || '';
        setSearchInput(value);
    };


    return (
        <>
            <IonHeader id="main-content">
                <IonToolbar color={'primary'}>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className=' ion-text-uppercase font-bold '>Taskify</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setExpandSearchBar(!expandSearchBar)}>
                            <IonIcon icon={search} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                {expandSearchBar ? (
                    <IonToolbar color={'primary'}>
                        <IonSearchbar value={searchInput} onIonInput={handleSearchInputChange}></IonSearchbar>
                    </IonToolbar>
                ) : null}
            </IonHeader>
        </>
    );
};

export default Header;
