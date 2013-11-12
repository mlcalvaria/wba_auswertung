<h2>WBA Auswertung</h2>

<div>Anzahl Zusagen: {{participants}}</div>
<div>Anzahl Absagen: {{denials}}</div>
<div>Ausstehend: {{pending}}</div>

<input type="search" ng-model="search">

<table>
    <thead>
        <tr>
            <th>Vorname</th>
            <th>Name</th>
            <th>Betreuer</th>
            <th>Teilnahme</th>
            <th>Firma</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="person in data | filter: search" ng-show="search">
            <td>{{person.Vorname}}</td>
            <td>{{person.Nachname}}</td>
            <td>{{person.Betreuer}}</td>
            <td>{{person.Teilnahme}}</td>
            <td>{{person.Firma}}</td>
        </tr>
    </tbody>
</table>