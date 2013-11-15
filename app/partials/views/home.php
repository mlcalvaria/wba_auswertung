<div class="top-bar">
    <h1 class="heading">WBA Auswertung</h1>
    <input autofocus="" class="search" type="search" ng-model="search" placeholder="Name / Firma">
</div>

<div class="clear">
    <p class="infopanel">Anzahl Zusagen: {{participants}}</p>
    <p class="infopanel">Anzahl Absagen: {{denials}}</p>
    <p class="infopanel">Ausstehend: {{pending}}</p>
    <p class="infopanel">Personen insgesamt (inkl. Partner & Kinder): {{allPersons}}</p>
</div>

<rt></rt>

<p class="h1 muted lead text-center no-data-panel" ng-hide="search.length > 1">Keine Daten geladen</p>