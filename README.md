`docker-compose up -V -d --build`

`docker compose -f .\docker-compose-build.yml up -d -V --build`

![plot](./Concepts/resourcify_concept.png)


Sistem omogućava rezervaciju resursa za radnike hipotetičke firme, kao i administraciju sistema.

Rezervacija resursa:

Zaposleni mogu raditi od kuće ili iz prostorija firme i pripadaju određenoj grupi (npr. odjelu firme). Ako dolaze na posao, najmanje 12 časova ranije moraju izvršiti rezervaciju radnog mjesta. Broj radnih mjesta je ograničen i svako mjesto ima minimalno jedinstveni identifikator, naziv i opis. Svaka rezervacija sadrži i tekstualni opis (razlog rezervacije). Nije moguće izvršiti dvostruke rezervacije niti retroaktivne rezervacije i oslobađanje rezervacija. (15 bodova)
Korisnici imaju grafički uvid u slobodna i rezervisana mjesta po danima. (5 bodova)
Korisnici mogu poslati poruku korisniku koji je rezervisao neko mjesto. (5 bodova)
Administratori imaju uvidu sve rezervacije, kao i istoriju rezervacija i otkaza istih. (5 bodova)
Administratori mogu izvršiti rezervaciju ili otkazivanje u ime drugog korisnika pri čemu taj korisnik dobija obavještenje. (5 bodova)
Prijava mora biti realizovana kroz lokalnu bazu korisnika (2 boda) ili upotrebom naloga sa *.etf.unibl.org domena upotrebom OAuth2 mehanizma. (5 bodova)

Opcione komponente sistema:

Sistem je realizovan upotrebom mikroservisne arhitekture. (10 bodova)
Sistem sadrži i servis za izvještavanje koji omogućava osnovnu analizu i vizuelizaciju rezeravacija i otkaza po vremenu, mjestu i korisniku.  (7 bodova)
Sistem omogućava detekciju šablona rezervacija (npr. jedan od mikroservisa analizira u realnom vremenu preklapanja ili sličnosti u rezervacijama korisnika koji pripadaju istoj grupi korisnika, moguće su i potpuno drugačije realizacije u dogovoru sa predmetnim nastavnikom). (8 bodova)
Sistem podržava rad i sa drugim vrstama resursa osim radnih mjesta, kao što su računar, projektor itd. (5 bodova)
Za sva pitanja slobodno se obratite predmetnom nastavniku.
