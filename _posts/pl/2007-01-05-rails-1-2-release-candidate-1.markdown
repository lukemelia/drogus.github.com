--- 
title: "Rails 1.2: Release Candidate 2"
typo_id: 12
layout: post
categories: ['pl']
---
Dzisiaj na oficjalnym blogu Ruby on Rails pojawiło się [ogłoszenie  o wydaniu Rails 1.2 RC2](http://weblog.rubyonrails.org/2007/1/5/rails-1-2-release-candidate-2). Co znaczy, że do oficjalnej wersji już całkiem niedaleko :)

Aby cieszyć się możliwościami wersji 1.2 należy w linii poleceń wpisać:

`gem install rails --source http://gems.rubyonrails.org --include-dependencies`

Powinno pojawić się coś w stylu: “Successfully installed rails-1.1.6.5618” (nowy numer będzie użyty dopiero, gdy zostanie wydana oficjalna wersja). 

Co nowego? Z rzeczy, które mi się najbardziej podobają:
* [REST](http://en.wikipedia.org/wiki/REST), dla ułatwienia dodany został generator scaffold'u, który tworzy _RESTful controllers_. Aby uyskać więcej info należy w konsoli wpisać: `script/generate scaffold_resource`.
* Dużo lepsza obsługa UTF-8 (i podobno kilku innych kodowań) dzięki dodaniu modułu **ActiveSupport::Multibyte**
* Warunki zapytań w metodzie find możemy podawać jako hashe, na przykład: `Person.find(:all, :conditions => { :last_name => "Catlin", :status => 1 })` - dla mnie bomba, ostatnio chciałem nadpisywać metodę find, a tutaj proszę, developerzy Raisów zrobili to za mnie.
* Metoda tworząca hasha na podstawie XML'a: `Hash.from_xml(string)`

I dużo dużo więcej, Ci ktorzy *żyją na krawędzi* więdzą mniej więdzej czego oczekiwać ;-) 
