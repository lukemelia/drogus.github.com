--- 
title: Historia pewnej aplikacji
typo_id: 5
layout: post
categories: ['pl']
---
Jakiś czas temu miałem wątpliwą przyjemnmość modyfikowania pewnego systemu CMS napsanego w PHP, w celu dopasowania go do klienta. CMS słaby jeżeli chodzi o kod (dość wolny, w niektórych miejsach mała dbałość o bezpieczeństwo, kiepskie zaprojektowanie). Po przejrzeniu specyfikacji stwierdziliśmy (z kolegą, który miał pisać to ze mną), że poprawki nie będą duże i można je będzie wprowadzić bez wielu zmian w kodzie. Nic bardziej mylnego. 

Chciałbym podzielić się wrażeniami z rozwijania dużej (jak się później okazało) aplikacji. Na razie wolałbym nie mówić o tym dla kogo ją pisaliśmy, gdyż jeszcze do końca się nie uwolniliśmy od tego projektu. Człowiek uczy się na błędach, więc o błędach chciałem napisać.

#### Odejście od specyfikacji

Niedługo po rozpoczęciu prac można było zobaczyć wyniki. Wstawiliśmy pierwszą wersję szablonów HTML, jeszcze bez ostatecznego formatowania, ale z grubsza przypominającą otrzymane grafiki. Od razu zaczęły się uwagi i spekulacje jakie moduły przydałoby dopisać i co zmienić aby ułatwić pracę przy wstawianiu treści. Stwierdziliśmy, że robiąc drobne poprawki nie przysparzamy sobie zbyt dużo pracy, a klient będzie zadowolony, więc jest nam to nawet na rękę. Bardzo duży błąd. Dopisując jeszcze funkcjonalność zawartą w specyfikacji, zaczęliśmy ową specyfikację zmieniać. Większość propozycji wychodzących od klienta nie było przemyślanych, czasami po dopisaniu kodu trzeba było go usunąć, bo "to jednak nie było to". Kod zaczął się powoli zaśmiecać, a my niejako staliśmy w miejscu - robiliśmy poprawki, a aplikacja była cały czas daleko od ukończenia.

#### Wybór technologii

W tamtym okresie nie myśleliśmy poważnie o czymkolwiek innym niż PHP. Baliśmy się deploymentu, klopotów z serwerem. Poza tym **prawie** gotowy system mieliśmy już napisany (należy w tym miejscu przypomnieć, że prawie robi wielką różnicę). Napisany, ale tak jak już wspomniałem napisany kiepsko. Trzymaliśmy się konwencji, w której napisany był CMS, a liczba linii kodu i funkcji drastycznie rosła. System był coraz bardziej zaśmiecony, o czymś takim jak moduły do testowania nawet nikt nie myślał, a często podczas poprawiania jednych błędów wynikały inne (zarówne w kodzie jak i te na poziomie projektowania). Nie wyglądało to dobrze.

#### Niewiedza klienta!

Niestety nie wzięliśmy poprawki na to z kim będziemy mieli dane pracować. Informatycy z owej instytucji nie są osobami kompetentnymi - cały czas wnosili o zmiany w serwisie, a bardzo łatwo było stwierdzić, że nie znają się nic a nic na specyfice aplikacji internetowych, ani na programowaniu czegokolwiek (ewentualnie jakiejś prostej w obsłudze pralki). Najlepiej chyba to opisze tekst **szefa informatyków**: Linki, na które kliknę zmieniają kolor (wcześniej proszono nas o zmianę _visited_ na odmienny kolor) i zostają takie nawet przez kilka dni. Trzeba było mu wytłumaczyć na czym to polega... Albo wysyłanie maili: "Prosimy o zrobienie archiwum dla całego serwisu", żeby zaraz potem wysłać maila "Oczyistym jest, że archiwum powinno być oddzielne dla każdego działu w serwisie". 

Najbardziej rozbrajały mnie te oczywstości, których było niesamowicie dużo. Wszystko co zrobiliśmy, a co nie było zgodne z ich błyskotliwymi przemyśleniami komentowane było: "Oczywistą rzeczą jest... ". Tłumaczenia, że nic nie jest takie oczywiste na niewiele się zdały. 

#### Przedwczesny start

Z racji tego, że czas naglił zmuszeni byliśmy uruchomić serwis i przeprowadzić szkolenia przy niedokończonej wersji - od strony użytkownika wchodzącego na stronę wszystko wyglądało dobrze, ale w panelu administracyjnym sporo było rzeczy, które mieliśmy zmienić. 

#### Kozi róg?

W tamtym momencie byliśmy w sytuacji podbramkowej. System był nieskończony, a było parę błedów i rzeczy do dopisania. Wtedy oczywiście klient przeszedł do ofensywy i nie patrząc na to ile zrobiliśmy rzeczy poza specyfikacją zaczął wytykanie nam "ewidentnych błędów, które uniemożliwiają pracę nas serwisem".

#### Współpraca

A raczej jej brak. Niestety to był jeden z tych projektów, w których nie mamy przyjaźnie nastawionych użytkowników. Cały system od początku był postrzegany jako zło konieczne - pracownicy mieli wprowadzać na stronę wyniki swojej pracy. Czyżby nagle trzeba było zacząć pracować? Najgorszym elementem okazał się edytor WYSIWIG. Pomimo długich tłumaczeń, że tekst z word'a nie zawsze się w nim dobrze sformatuje notorycznie mieliśmy telefony, że tekstu nie da się sformatować. Niezliczoną ilość razy musiałem powiedzieć o tym jak wtedy należy postąpić: zapisać dokument jako plik _.txt_, wkleić do edytora i dopiero wtedy sformatować. Według użytkowników to jest za dużo pracy. Cóż z tego, że w większości wypadków formatowanie tektu zajmowało mi ok. 10 min? Najlepszy byłby oczywiście system, który sam napisałby i sformatował artykuł, a później zaparzył kawę i poszedł do kiosku po gazetę.

#### Rewolucja?

Po jakimś czasie poprawiliśmy większość błędów, ale pewne rzeczy ciężko było zmienić bez przebudowy wielu linijek kodu. Zdecydowaliśmy się na przepisanie systemu używając ruby on rails. Jak pomyśleliśmy tak też zrobiliśmy i mamy teraz tak samo wyglądający system, ale z railsami pod maską. Aplikacja chodzi o jakieś 30% szybciej - łatwo można zauważyć, że poprzedni cms był naprawdę kiepsko napisany. Do tego nie dopisaliśmy jeszcze cache'owania, a na pewno to zrobimy - zmiany na stronie są wprowadzane dość rzadko.

Nie muszę chyba wspominać, że napisanie tego systemu od początku zajęło nam dużo mniej czasu niż modyfikacja poprzedniego. Trochę boli fakt, że wyszedł z tego taki sam system. Nie wykorzystaliśmy więc mocy jaka drzemie w railsach. Jeżeli chodzi funkcjonalność i ciekawe rozwiązania wyszedł z tego marny przeciętniak. 

#### Podsumowując!

Podczas pracy nad tym projektem popełniliśmy chyba wszystkie błędy, które dało się popełnić (zgodnie z prawem Murphy'iego ;-) ). Czasu na tym straciliśmy tyle, że pracowaliśmy za przysłowiową miskę ryżu, a momenty zwątpienia lub chęci odwiedzenia pracowników owej instytucji z kałasznikowem w ręku były bardzo częste. Można spytać, czy...

#### ...warto było?

Myślę, że pomimo wszystko warto było się pomęczyć. Wiele się nauczyłem i czuję, że takie doświadczenia mi się przydadzą. Swoją drogą jest to doskonały przykład uczenia się na błędach ;-) I wiem nad czym muszę jeszcze dużo popracować: komunikacja z klientem. 

I to by było na tyle jeżeli o historię pewnej aplikacji chodzi.
