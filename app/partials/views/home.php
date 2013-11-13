<div class="top-bar">
    <h1 class="text-center fl">WBA Auswertung</h1>
    <input autofocus="" class="search bold" type="search" ng-model="search" placeholder="Name / Firma">
</div>

<div class="clear">
    <p class="infopanel">Anzahl Zusagen: {{participants}}</p>
    <p class="infopanel">Anzahl Absagen: {{denials}}</p>
    <p class="infopanel">Ausstehend: {{pending}}</p>
    <p class="infopanel">Personen insgesamt (inkl. Partner & Kinder): {{allPersons}}</p>
</div>

<table class="table table-striped" ng-show="search.length > 1">
    <thead>
        <tr>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Betreuer</th>
            <th>Partner</th>
            <th>Kinder</th>
            <th>Teilnahme</th>
            <th>Firma</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="person in clients | filter: searchFilter">
            <td><input type="text" ng-model="person.Vorname" ng-change="updatePerson(person)"></td>
            <td><input type="text" ng-model="person.Nachname" ng-change="updatePerson(person)"></td>
            <td><input type="text" ng-model="person.Betreuer" ng-change="updatePerson(person)"></td>
            <td><input type="text" ng-model="person.Partner" ng-change="updatePerson(person)"></td>
            <td><input type="text" ng-model="person.Kinder" ng-change="updatePerson(person)"></td>
            <td><input type="text" ng-model="person.Teilnahme" ng-change="updatePerson(person)"></td>
            <td><input type="text" ng-model="person.Firma" ng-change="updatePerson(person)"></td>
        </tr>
    </tbody>
</table>

<p class="h1 muted lead text-center no-data-panel" ng-hide="search.length > 1">Keine Daten geladen</p>