const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}


document.querySelectorAll('[data-slideshow]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.slide')];
  const dots = [...gallery.querySelectorAll('.dot')];
  const counter = gallery.querySelector('.slide-counter');
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  gallery.querySelector('.prev')?.addEventListener('click', () => show(current - 1));
  gallery.querySelector('.next')?.addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  let startX = null;
  gallery.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  gallery.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});
});


document.querySelectorAll('[data-video-slideshow]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.video-slide')];
  const counter = gallery.querySelector('.video-counter');
  let current = 0;

  const show = (index) => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      if (!active) slide.querySelector('video')?.pause();
    });
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  gallery.querySelector('.prev')?.addEventListener('click', () => show(current - 1));
  gallery.querySelector('.next')?.addEventListener('click', () => show(current + 1));

  let startX = null;
  gallery.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  gallery.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});

  show(0);
});


/* Language switcher: English / German / Spanish */
const translations = {
  de: {
    "Menu":"Menü","Home":"Start","Analysis":"Analysen","Scouting":"Scouting","About":"Über mich","Contact":"Kontakt",
    "Football Tactical Analysis & Scouting":"Fußball-Taktikanalyse & Scouting",
    "Strategic Play · Tactical Perspective":"Strategisches Spiel · Taktische Perspektive",
    "Football Analysis.":"Fußballanalyse.","Tactical Perspective.":"Taktische Perspektive.",
    "Detailed tactical analysis, opposition analysis and player scouting focused on how teams create advantages with and without the ball.":"Detaillierte Taktik- und Gegneranalysen sowie Spielerscouting mit Fokus darauf, wie Teams mit und ohne Ball Vorteile schaffen.",
    "View Analysis":"Analysen ansehen","About Me":"Über mich","Selected work":"Ausgewählte Arbeiten","Featured Work":"Ausgewählte Arbeiten",
    "View all analysis →":"Alle Analysen ansehen →","Team Analysis":"Teamanalyse",
    "PSG 2024–26: The Making of Back-to-Back European Champions":"PSG 2024–26: Der Weg zu zwei europäischen Titeln in Folge",
    "A tactical study of Paris Saint-Germain across two dominant European seasons under Luis Enrique.":"Eine taktische Studie über Paris Saint-Germain während zweier dominanter europäischer Spielzeiten unter Luis Enrique.",
    "Read Analysis →":"Analyse lesen →","COMING SOON":"BALD VERFÜGBAR","Champions League Series":"Champions-League-Serie",
    "Next European Champion":"Nächster Europameister","The series will continue through Champions League winners of the past 20 years.":"Die Serie wird mit den Champions-League-Siegern der vergangenen 20 Jahre fortgesetzt.",
    "Player Report":"Spielerbericht","Future player scouting reports will appear here once published.":"Zukünftige Scoutingberichte erscheinen hier nach ihrer Veröffentlichung.",
    "Coming soon":"Bald verfügbar","Services":"Leistungen","What I Do":"Was ich mache","Tactical Analysis":"Taktikanalyse",
    "Team structures, build-up, pressing, defensive organisation, transitions and collective behaviour.":"Teamstrukturen, Spielaufbau, Pressing, Defensivorganisation, Umschalten und kollektives Verhalten.",
    "Opposition Analysis":"Gegneranalyse","Patterns, tendencies, strengths, weaknesses and spaces that can be exploited.":"Muster, Tendenzen, Stärken, Schwächen und Räume, die ausgenutzt werden können.",
    "Player Scouting":"Spielerscouting","Players evaluated in tactical context: role, decision-making, qualities and system fit.":"Spielerbewertung im taktischen Kontext: Rolle, Entscheidungsfindung, Qualitäten und Systempassung.",
    "Set-Piece Analysis":"Standardsituationsanalyse","Attacking and defensive corners, free kicks and recurring set-piece structures.":"Offensive und defensive Ecken, Freistöße und wiederkehrende Standardsituations-Strukturen.",
    "Method":"Methode","My Approach":"Mein Ansatz","Without the ball":"Ohne Ball","Relentless pressure":"Konstanter Druck",
    "Aggressive pressing, man-to-man responsibility, intensity and a proactive hunt to regain possession.":"Aggressives Pressing, klare Mannorientierungen, hohe Intensität und aktives Jagen nach Ballgewinnen.",
    "With the ball":"Mit Ball","Freedom within structure":"Freiheit innerhalb der Struktur","Roaming, rotations and positional freedom supported by collective coverage and tactical responsibility.":"Freies Bewegen, Rotationen und Positionsfreiheit, abgesichert durch kollektive Raumdeckung und taktische Verantwortung.",
    "Education":"Ausbildung","Professional Diploma in Football Tactical Analysis":"Professional Diploma in Football Tactical Analysis",
    "Professional Diploma in Football Scouting and Tactical Analysis":"Professional Diploma in Football Scouting and Tactical Analysis",
    "Let’s Talk Football.":"Lass uns über Fußball sprechen.","For analysis, scouting or collaboration enquiries.":"Für Anfragen zu Analysen, Scouting oder Zusammenarbeit.","Contact Me":"Kontakt aufnehmen",

    "The Analysis Archive":"Analyse-Archiv","Detailed studies of teams, matches, tactical concepts and competitions, focusing on the structures, decisions and collective behaviours that shape the game.":"Detaillierte Studien zu Teams, Spielen, taktischen Konzepten und Wettbewerben mit Fokus auf Strukturen, Entscheidungen und kollektive Verhaltensweisen.",
    "All":"Alle","Match Analysis":"Spielanalyse","Build-Up":"Spielaufbau","Pressing":"Pressing","Defensive Organisation":"Defensivorganisation","Transitions":"Umschalten","Set Pieces":"Standards",
    "A tactical study of Paris Saint-Germain across the 2024/25 and 2025/26 seasons.":"Eine taktische Studie über Paris Saint-Germain in den Spielzeiten 2024/25 und 2025/26.",

    "Player Evaluation":"Spielerbewertung","Detailed player evaluations focused on tactical role, technical qualities, decision-making and suitability for different systems.":"Detaillierte Spielerbewertungen mit Fokus auf taktische Rolle, technische Qualitäten, Entscheidungsfindung und Eignung für verschiedene Systeme.",
    "Goalkeepers":"Torhüter","Defenders":"Verteidiger","Midfielders":"Mittelfeldspieler","Forwards":"Stürmer","SCOUTING REPORT":"SCOUTINGBERICHT",
    "Coming Soon":"Bald verfügbar","Published scouting reports will appear here.":"Veröffentlichte Scoutingberichte erscheinen hier.",

    "Profile":"Profil","Football tactical analyst and scout focused on understanding the tactical details behind the game.":"Fußball-Taktikanalyst und Scout mit Fokus auf die taktischen Details hinter dem Spiel.",
    "Experience":"Erfahrung","Independent analysis work":"Unabhängige Analysearbeit",
    "Portfolio work focused on tactical analysis, opposition analysis, video analysis and player scouting.":"Portfolioarbeit mit Fokus auf Taktikanalyse, Gegneranalyse, Videoanalyse und Spielerscouting.",
    "Professional education in football tactical analysis and scouting.":"Professionelle Ausbildung in Fußball-Taktikanalyse und Scouting.",
    "Certifications":"Zertifikate","Professional Diplomas":"Professional Diplomas","Football Tactical Analysis":"Fußball-Taktikanalyse","Football Scouting and Tactical Analysis":"Fußball-Scouting und Taktikanalyse",
    "Skills":"Fähigkeiten","Core Skills":"Kernkompetenzen","Video Analysis":"Videoanalyse","Pressing Analysis":"Pressinganalyse","Build-Up Analysis":"Spielaufbauanalyse","Data Interpretation":"Dateninterpretation",
    "Football Philosophy":"Fußballphilosophie","Principles":"Prinzipien","Relentless Pressure":"Konstanter Druck",
    "Without the ball, the objective is to aggressively hunt possession. I favour intense man-to-man pressure, forcing opponents into uncomfortable situations and constantly searching for opportunities to regain the ball.":"Ohne Ball ist das Ziel, den Ballbesitz aggressiv zurückzuerobern. Ich bevorzuge intensiven mannorientierten Druck, der Gegner in unangenehme Situationen zwingt und ständig nach Möglichkeiten für Ballgewinne sucht.",
    "Pressing should not be passive. The team actively searches for triggers and opportunities to attack the opponent’s possession. The mentality is: Pressing. Pressing. Pressing.":"Pressing sollte nicht passiv sein. Das Team sucht aktiv nach Auslösern und Möglichkeiten, den gegnerischen Ballbesitz anzugreifen. Die Mentalität lautet: Pressing. Pressing. Pressing.",
    "Freedom Within Structure":"Freiheit innerhalb der Struktur",
    "In possession, I prefer freedom over overly rigid positional occupation. Players should be able to roam, rotate and leave their nominal positions when they recognise an advantage.":"In Ballbesitz bevorzuge ich Freiheit gegenüber zu starrer Positionsbesetzung. Spieler sollen sich frei bewegen, rotieren und ihre nominellen Positionen verlassen können, wenn sie einen Vorteil erkennen.",
    "When one player leaves a space, another player should recognise the movement and occupy, protect or compensate for the resulting space. Structure exists to support freedom rather than restrict it.":"Wenn ein Spieler einen Raum verlässt, sollte ein anderer die Bewegung erkennen und den entstehenden Raum besetzen, schützen oder ausgleichen. Struktur soll Freiheit ermöglichen, nicht einschränken.",

    "For professional enquiries regarding tactical analysis, scouting or collaboration.":"Für professionelle Anfragen zu Taktikanalyse, Scouting oder Zusammenarbeit.",
    "Email":"E-Mail","Get in touch":"Kontakt aufnehmen","Name":"Name","Organisation":"Organisation","Subject":"Betreff","Message":"Nachricht","Send Message":"Nachricht senden",

    "A tactical study of Paris Saint-Germain across the 2024/25 and 2025/26 seasons, exploring how Luis Enrique built a team capable of dominating Europe through pressing, fluid movement and collective organisation.":"Eine taktische Studie über Paris Saint-Germain in den Spielzeiten 2024/25 und 2025/26 und darüber, wie Luis Enrique durch Pressing, flüssige Bewegungen und kollektive Organisation ein Team formte, das Europa dominieren konnte.",
    "Introduction":"Einleitung",
    "This analysis marks the beginning of a series looking at the UEFA Champions League winners of the past 20 years, with each edition focusing on the tactical identity and key principles behind a successful European campaign.":"Diese Analyse bildet den Auftakt einer Serie über die UEFA-Champions-League-Sieger der vergangenen 20 Jahre. Jede Ausgabe konzentriert sich auf die taktische Identität und die zentralen Prinzipien hinter einer erfolgreichen europäischen Saison.",
    "The series begins with Paris Saint-Germain and their remarkable period between 2024 and 2026. What makes this PSG side particularly interesting is not simply the success itself, but the level of dominance they were able to sustain across two consecutive seasons.":"Die Serie beginnt mit Paris Saint-Germain und der bemerkenswerten Phase zwischen 2024 und 2026. Besonders interessant ist nicht nur der Erfolg selbst, sondern die Dominanz, die PSG über zwei aufeinanderfolgende Spielzeiten aufrechterhalten konnte.",
    "The central question of this analysis is therefore simple:":"Die zentrale Frage dieser Analyse ist daher einfach:","How did PSG do it?":"Wie hat PSG das geschafft?",
    "To answer that question, the analysis will look at the evolution of the team under Luis Enrique, their structures in possession and without the ball, the freedom and rotations within their attacking game, and the collective mechanisms that allowed those movements to function without losing balance.":"Um diese Frage zu beantworten, betrachtet die Analyse die Entwicklung des Teams unter Luis Enrique, die Strukturen mit und ohne Ball, die Freiheit und Rotationen im Angriffsspiel sowie die kollektiven Mechanismen, durch die diese Bewegungen ohne Verlust der Balance funktionieren konnten.",
    "Both Champions League finals will then be examined individually, before bringing the different elements together to understand why this PSG side was able to remain at the top of European football across two seasons.":"Anschließend werden beide Champions-League-Finals einzeln betrachtet, bevor die verschiedenen Elemente zusammengeführt werden, um zu verstehen, warum dieses PSG-Team über zwei Spielzeiten an der Spitze des europäischen Fußballs bleiben konnte.",
    "The Evolution of PSG":"Die Entwicklung von PSG","Phase 1 — Building the Structure":"Phase 1 — Aufbau der Struktur",
    "Your browser does not support the video tag.":"Dein Browser unterstützt das Video-Element nicht.",
    "In the early stages of Luis Enrique’s project, PSG played a highly controlled and positionally disciplined style of football. Players rarely exchanged positions freely, with the team instead maintaining clearly defined zones and a stable positional structure.":"In der Anfangsphase von Luis Enriques Projekt spielte PSG einen stark kontrollierten und positionsdisziplinierten Fußball. Die Spieler tauschten nur selten frei ihre Positionen und hielten stattdessen klar definierte Zonen sowie eine stabile Positionsstruktur.",
    "At this point, the priority was not yet to create the fluid and unpredictable PSG that would emerge later. Enrique first needed to build a functioning collective: establishing clear reference points in possession, teaching the players his positional principles and creating a shared understanding of how the team should occupy the pitch.":"Zu diesem Zeitpunkt ging es noch nicht darum, das später so fluide und unberechenbare PSG zu erschaffen. Enrique musste zunächst ein funktionierendes Kollektiv aufbauen: klare Orientierungspunkte im Ballbesitz schaffen, seine Positionsprinzipien vermitteln und ein gemeinsames Verständnis dafür entwickeln, wie das Team den Platz besetzen sollte.",
    "This controlled structure provided the foundation for PSG’s later evolution. Once the players had internalised Enrique’s ideas and developed stronger relationships with one another, the team could gradually move away from rigid positioning and introduce the rotations, freedom and collective adaptations that would eventually become central to their identity.":"Diese kontrollierte Struktur bildete die Grundlage für PSGs spätere Entwicklung. Nachdem die Spieler Enriques Ideen verinnerlicht und stärkere Verbindungen untereinander entwickelt hatten, konnte sich das Team schrittweise von starren Positionen lösen und Rotationen, Freiheit sowie kollektive Anpassungen einführen, die später zum Kern seiner Identität wurden.",
    "As the group developed, that began to change. PSG gradually became less rigid and more fluid. Players were given greater freedom to leave their positions, rotate with teammates and interpret space, because the team had developed the collective understanding required to compensate for those movements.":"Mit der Entwicklung der Gruppe änderte sich das. PSG wurde nach und nach weniger starr und deutlich fluider. Die Spieler erhielten mehr Freiheit, ihre Positionen zu verlassen, mit Mitspielern zu rotieren und Räume selbstständig zu interpretieren, weil das Team das nötige kollektive Verständnis entwickelt hatte, um diese Bewegungen abzusichern.",
    "Several players became particularly important to that evolution. Ousmane Dembélé, Khvicha Kvaratskhelia, Nuno Mendes, Vitinha, Achraf Hakimi and Désiré Doué all had a major tactical influence on the team. Their specific roles will become clearer in the sections on PSG’s behaviour in and out of possession.":"Mehrere Spieler wurden für diese Entwicklung besonders wichtig. Ousmane Dembélé, Khvicha Kvaratskhelia, Nuno Mendes, Vitinha, Achraf Hakimi und Désiré Doué hatten großen taktischen Einfluss auf das Team. Ihre konkreten Rollen werden in den Abschnitten über PSGs Verhalten mit und ohne Ball deutlicher.",
    "The 2024/25 season also represented a transition within the squad itself. Kvaratskhelia, for example, only arrived during the winter window, meaning the team that eventually won the Champions League was still developing during the season.":"Auch die Saison 2024/25 war innerhalb des Kaders eine Übergangsphase. Kvaratskhelia kam beispielsweise erst im Winter, sodass sich selbst das Team, das später die Champions League gewann, während der Saison noch weiterentwickelte.",
    "By 2025/26, PSG were also able to manage their squad more deliberately around the Champions League. Key players such as Dembélé, Doué, Vitinha and Nuno Mendes were used less frequently in domestic competitions, allowing them to arrive fresher for the biggest European matches. At the same time, PSG retained their most important players while continuing to add depth to the squad.":"2025/26 konnte PSG den Kader gezielter auf die Champions League ausrichten. Schlüsselspieler wie Dembélé, Doué, Vitinha und Nuno Mendes wurden in nationalen Wettbewerben seltener eingesetzt und gingen dadurch frischer in die wichtigsten europäischen Spiele. Gleichzeitig hielt PSG seine wichtigsten Spieler und verstärkte weiterhin die Kadertiefe.",
    "In Possession — From Structure to Freedom":"Mit Ball — Von Struktur zu Freiheit",
    "Once PSG had established the positional foundations of Luis Enrique’s football, their possession game evolved into something far more fluid. The following sequences are":"Nachdem PSG die positionsbezogenen Grundlagen von Luis Enriques Fußball etabliert hatte, entwickelte sich das Ballbesitzspiel zu etwas deutlich Fluiderem. Die folgenden Sequenzen sind",
    "examples of recurring rotations":"Beispiele für wiederkehrende Rotationen",
    "rather than fixed patterns. The positions constantly changed, but the underlying principle remained the same: when one player moved away from his zone, another player occupied or protected the space that movement created.":"und keine starren Muster. Die Positionen wechselten ständig, doch das Grundprinzip blieb gleich: Verließ ein Spieler seine Zone, besetzte oder sicherte ein anderer den dadurch entstehenden Raum.",
    "Right-Side Rotations":"Rotationen auf der rechten Seite",
    "Much of PSG’s possession was developed through the right side. Dembélé could drop extremely deep on the right, drawing opponents away from the last line and becoming involved in the construction of the attack. His movement opened space ahead of him for Hakimi and, in this example, Doué to attack. Behind those rotations, Zaïre-Emery could cover the space vacated by Hakimi, allowing the right-back to advance without leaving the structure completely exposed.":"Ein großer Teil von PSGs Ballbesitzspiel wurde über die rechte Seite entwickelt. Dembélé konnte dort extrem tief abkippen, Gegner aus der letzten Linie herausziehen und sich am Spielaufbau beteiligen. Seine Bewegung öffnete vor ihm Raum für Hakimi und in diesem Beispiel Doué. Hinter diesen Rotationen konnte Zaïre-Emery den von Hakimi verlassenen Raum absichern, sodass der Rechtsverteidiger vorrücken konnte, ohne die Struktur völlig ungeschützt zu lassen.",
    "Vitinha, Nuno Mendes & the Left Side":"Vitinha, Nuno Mendes & die linke Seite",
    "Vitinha’s positioning was equally flexible. He could operate as the number six, but when Nuno Mendes moved high and occupied the left wing, Vitinha could drop into the left centre-back zone. In those situations, Fabián Ruiz or Zaïre-Emery could become the central midfielder at the base of the structure. Rather than relying on one fixed build-up shape, PSG continually redistributed responsibilities depending on the movement around the ball.":"Auch Vitinhas Positionierung war äußerst flexibel. Er konnte als Sechser agieren, doch wenn Nuno Mendes hoch schob und den linken Flügel besetzte, konnte Vitinha in die linke Innenverteidigerzone zurückfallen. In diesen Situationen konnten Fabián Ruiz oder Zaïre-Emery die zentrale Position an der Basis der Struktur übernehmen. Statt auf eine feste Aufbauformation zu setzen, verteilte PSG die Aufgaben je nach Bewegung rund um den Ball ständig neu.",
    "Width Without Fixed Wingers":"Breite ohne feste Flügelspieler",
    "Kvaratskhelia often provided width on the left touchline, but even that role was not permanent. He could suddenly appear on the opposite touchline, just as Doué could move across the pitch. These exchanges made PSG difficult to reference defensively: the width remained, but the player providing it could change from one sequence to the next.":"Kvaratskhelia gab häufig Breite an der linken Seitenlinie, doch selbst diese Rolle war nicht dauerhaft festgelegt. Er konnte plötzlich an der gegenüberliegenden Seitenlinie auftauchen, genauso wie Doué die Seite wechseln konnte. Diese Wechsel erschwerten defensive Zuordnungen: Die Breite blieb erhalten, aber der Spieler, der sie herstellte, konnte sich von Sequenz zu Sequenz ändern.",
    "Occupying the Centre":"Besetzung des Zentrums",
    "The rotations could create unusual attacking pictures. At times, Fabián Ruiz could become the only PSG player occupying the highest central zone while the nominal forwards moved elsewhere to create or attack space. What looked like positional freedom was therefore not simply random movement — the team continued to occupy the necessary spaces, only with different players filling them.":"Die Rotationen konnten ungewöhnliche Angriffsbilder erzeugen. Zeitweise war Fabián Ruiz der einzige PSG-Spieler in der höchsten zentralen Zone, während sich die nominellen Stürmer in andere Räume bewegten, um Platz zu schaffen oder anzugreifen. Was wie völlige Positionsfreiheit wirkte, war daher keine zufällige Bewegung – die notwendigen Räume blieben besetzt, nur von unterschiedlichen Spielern.",
    "Switching to the Weak Side":"Verlagerung auf die ballferne Seite",
    "Although PSG frequently progressed through the right, the opposite side remained a constant threat. When Nuno Mendes and Kvaratskhelia were isolated on the left, PSG could quickly switch the ball across the pitch and attack the space created by the opponent’s shift towards the right. The result was a possession structure built around overloads, rotations and rapid changes of the point of attack rather than fixed individual positions.":"Obwohl PSG häufig über rechts aufbaute, blieb die gegenüberliegende Seite eine permanente Gefahr. Waren Nuno Mendes und Kvaratskhelia links isoliert, konnte PSG den Ball schnell verlagern und den Raum angreifen, der durch das Verschieben des Gegners nach rechts entstand. So entstand eine Ballbesitzstruktur, die auf Überladungen, Rotationen und schnellen Wechseln des Angriffspunkts statt auf festen Einzelpositionen beruhte.",
    "Without the Ball":"Ohne Ball",
    "Without the ball, PSG were just as aggressive and flexible as they were in possession. The following clip shows two examples of opposition build-up structures PSG regularly had to solve and how their man-oriented pressing adapted to both.":"Ohne Ball war PSG ebenso aggressiv und flexibel wie im Ballbesitz. Der folgende Clip zeigt zwei Beispiele gegnerischer Aufbaustrukturen und wie PSG sein mannorientiertes Pressing jeweils daran anpasste.",
    "Against a 4-4-2 Build-Up":"Gegen einen 4-4-2-Aufbau",
    "Against a 4-4-2, the opposition’s two forwards could drop very deep while the wide players stayed high. PSG responded with an extremely aggressive man-oriented approach: the centre-backs stepped forward onto the two strikers and were prepared to follow them even when they moved far away from the defensive line.":"Gegen ein 4-4-2 konnten die beiden gegnerischen Stürmer sehr tief kommen, während die Flügelspieler hoch blieben. PSG reagierte mit einer extrem aggressiven Mannorientierung: Die Innenverteidiger rückten auf die beiden Stürmer heraus und waren bereit, ihnen auch weit weg von der eigenen Abwehrlinie zu folgen.",
    "For most teams, committing centre-backs this aggressively would create major problems elsewhere. PSG could sustain it because the pressing system had become deeply internalised. Players were comfortable taking over different responsibilities as the structure changed, allowing one player to leave his nominal position while teammates adjusted and protected the spaces around him.":"Für die meisten Teams würde ein derart aggressives Herausrücken der Innenverteidiger an anderer Stelle große Probleme erzeugen. PSG konnte es aufrechterhalten, weil das Pressingsystem tief verinnerlicht war. Die Spieler übernahmen selbstverständlich unterschiedliche Aufgaben, wenn sich die Struktur veränderte, sodass ein Spieler seine nominelle Position verlassen konnte, während die Mitspieler sich anpassten und die Räume um ihn herum absicherten.",
    "Against a 4-3-3 Build-Up":"Gegen einen 4-3-3-Aufbau",
    "The same principle could be adapted against a 4-3-3. In the example shown, the left centre-back steps onto the opposition striker, the right centre-back moves out towards the right winger, and the right-back jumps forward onto the opposition right-back. PSG’s defensive line therefore did not simply protect its own zones — individual defenders could leave the line and take responsibility for opponents much higher up the pitch.":"Dasselbe Prinzip ließ sich gegen ein 4-3-3 anpassen. Im gezeigten Beispiel rückt der linke Innenverteidiger auf den gegnerischen Stürmer, der rechte Innenverteidiger schiebt zum rechten Flügelspieler heraus und der Rechtsverteidiger springt auf den gegnerischen Rechtsverteidiger. PSGs Abwehrlinie schützte also nicht nur ihre eigenen Zonen – einzelne Verteidiger konnten die Linie verlassen und deutlich höher Verantwortung für Gegenspieler übernehmen.",
    "This required enormous collective understanding. The pressing structure could change within seconds, but because players were capable of covering different positions and responsibilities, PSG could maintain pressure without abandoning the overall organisation.":"Das erforderte enormes kollektives Verständnis. Die Pressingstruktur konnte sich innerhalb von Sekunden verändern, doch weil die Spieler verschiedene Positionen und Aufgaben übernehmen konnten, hielt PSG den Druck aufrecht, ohne die Gesamtorganisation aufzugeben.",
    "Forcing Play Away from the Centre":"Das Spiel aus dem Zentrum lenken",
    "The final seconds of the clip highlight an important detail in the forwards’ pressing. Rather than running directly towards the centre-backs, PSG’s forwards approached from the inside and curved their runs outwards. Their first objective was to close the passing lane into central areas; only then did they accelerate towards the centre-back.":"Die letzten Sekunden des Clips zeigen ein wichtiges Detail im Pressing der Stürmer. Statt direkt auf die Innenverteidiger zuzulaufen, kamen PSGs Angreifer von innen und bogen ihre Läufe nach außen. Das erste Ziel war, den Passweg ins Zentrum zu schließen; erst danach beschleunigten sie auf den Innenverteidiger.",
    "This meant the press was not based on intensity alone. PSG used the angle of the run to remove the opponent’s preferred inside option, guide the build-up towards the outside and then attack the ball. The aggression of the press was therefore supported by a clear understanding of which spaces PSG wanted to protect and which passes they were willing to allow.":"Das Pressing beruhte also nicht nur auf Intensität. PSG nutzte den Laufwinkel, um die bevorzugte Innenoption des Gegners zu schließen, den Aufbau nach außen zu lenken und anschließend den Ball anzugreifen. Die Aggressivität wurde dadurch von einem klaren Verständnis getragen, welche Räume PSG schützen und welche Pässe es zulassen wollte.",
    "2025 Champions League Final":"Champions-League-Finale 2025","2025/26: Defending the Crown":"2025/26: Die Titelverteidigung",
    "2026 Champions League Final":"Champions-League-Finale 2026","Why This Team Worked":"Warum dieses Team funktionierte","Conclusion":"Fazit","← Back to all analyses":"← Zurück zu allen Analysen"
  },
  es: {
    "Menu":"Menú","Home":"Inicio","Analysis":"Análisis","Scouting":"Scouting","About":"Sobre mí","Contact":"Contacto",
    "Football Tactical Analysis & Scouting":"Análisis táctico de fútbol & Scouting",
    "Strategic Play · Tactical Perspective":"Juego estratégico · Perspectiva táctica",
    "Football Analysis.":"Análisis de fútbol.","Tactical Perspective.":"Perspectiva táctica.",
    "Detailed tactical analysis, opposition analysis and player scouting focused on how teams create advantages with and without the ball.":"Análisis tácticos detallados, análisis del rival y scouting de jugadores centrados en cómo los equipos generan ventajas con y sin balón.",
    "View Analysis":"Ver análisis","About Me":"Sobre mí","Selected work":"Trabajo seleccionado","Featured Work":"Trabajo destacado",
    "View all analysis →":"Ver todos los análisis →","Team Analysis":"Análisis de equipo",
    "PSG 2024–26: The Making of Back-to-Back European Champions":"PSG 2024–26: La construcción de dos títulos europeos consecutivos",
    "A tactical study of Paris Saint-Germain across two dominant European seasons under Luis Enrique.":"Un estudio táctico del Paris Saint-Germain durante dos temporadas dominantes en Europa bajo Luis Enrique.",
    "Read Analysis →":"Leer análisis →","COMING SOON":"PRÓXIMAMENTE","Champions League Series":"Serie de Champions League",
    "Next European Champion":"Próximo campeón de Europa","The series will continue through Champions League winners of the past 20 years.":"La serie continuará con los campeones de la Champions League de los últimos 20 años.",
    "Player Report":"Informe de jugador","Future player scouting reports will appear here once published.":"Los futuros informes de scouting aparecerán aquí cuando sean publicados.",
    "Coming soon":"Próximamente","Services":"Servicios","What I Do":"Lo que hago","Tactical Analysis":"Análisis táctico",
    "Team structures, build-up, pressing, defensive organisation, transitions and collective behaviour.":"Estructuras de equipo, salida de balón, presión, organización defensiva, transiciones y comportamiento colectivo.",
    "Opposition Analysis":"Análisis del rival","Patterns, tendencies, strengths, weaknesses and spaces that can be exploited.":"Patrones, tendencias, fortalezas, debilidades y espacios que pueden ser explotados.",
    "Player Scouting":"Scouting de jugadores","Players evaluated in tactical context: role, decision-making, qualities and system fit.":"Jugadores evaluados en contexto táctico: rol, toma de decisiones, cualidades y encaje en el sistema.",
    "Set-Piece Analysis":"Análisis de balón parado","Attacking and defensive corners, free kicks and recurring set-piece structures.":"Córners ofensivos y defensivos, faltas y estructuras recurrentes a balón parado.",
    "Method":"Método","My Approach":"Mi enfoque","Without the ball":"Sin balón","Relentless pressure":"Presión constante",
    "Aggressive pressing, man-to-man responsibility, intensity and a proactive hunt to regain possession.":"Presión agresiva, responsabilidades hombre a hombre, intensidad y búsqueda activa de recuperar la posesión.",
    "With the ball":"Con balón","Freedom within structure":"Libertad dentro de la estructura","Roaming, rotations and positional freedom supported by collective coverage and tactical responsibility.":"Movilidad, rotaciones y libertad posicional respaldadas por coberturas colectivas y responsabilidad táctica.",
    "Education":"Formación","Let’s Talk Football.":"Hablemos de fútbol.","For analysis, scouting or collaboration enquiries.":"Para consultas sobre análisis, scouting o colaboración.","Contact Me":"Contactar",

    "The Analysis Archive":"Archivo de análisis","Detailed studies of teams, matches, tactical concepts and competitions, focusing on the structures, decisions and collective behaviours that shape the game.":"Estudios detallados de equipos, partidos, conceptos tácticos y competiciones, centrados en las estructuras, decisiones y comportamientos colectivos que dan forma al juego.",
    "All":"Todos","Match Analysis":"Análisis de partido","Build-Up":"Salida de balón","Pressing":"Presión","Defensive Organisation":"Organización defensiva","Transitions":"Transiciones","Set Pieces":"Balón parado",
    "A tactical study of Paris Saint-Germain across the 2024/25 and 2025/26 seasons.":"Un estudio táctico del Paris Saint-Germain durante las temporadas 2024/25 y 2025/26.",

    "Player Evaluation":"Evaluación de jugadores","Detailed player evaluations focused on tactical role, technical qualities, decision-making and suitability for different systems.":"Evaluaciones detalladas de jugadores centradas en el rol táctico, cualidades técnicas, toma de decisiones y adecuación a distintos sistemas.",
    "Goalkeepers":"Porteros","Defenders":"Defensas","Midfielders":"Centrocampistas","Forwards":"Delanteros","SCOUTING REPORT":"INFORME DE SCOUTING",
    "Coming Soon":"Próximamente","Published scouting reports will appear here.":"Los informes de scouting publicados aparecerán aquí.",

    "Profile":"Perfil","Football tactical analyst and scout focused on understanding the tactical details behind the game.":"Analista táctico de fútbol y scout centrado en comprender los detalles tácticos que hay detrás del juego.",
    "Experience":"Experiencia","Independent analysis work":"Trabajo de análisis independiente",
    "Portfolio work focused on tactical analysis, opposition analysis, video analysis and player scouting.":"Trabajo de portfolio centrado en análisis táctico, análisis del rival, análisis de vídeo y scouting de jugadores.",
    "Professional education in football tactical analysis and scouting.":"Formación profesional en análisis táctico de fútbol y scouting.",
    "Certifications":"Certificaciones","Professional Diplomas":"Diplomas profesionales","Football Tactical Analysis":"Análisis táctico de fútbol","Football Scouting and Tactical Analysis":"Scouting de fútbol y análisis táctico",
    "Skills":"Habilidades","Core Skills":"Competencias principales","Video Analysis":"Análisis de vídeo","Pressing Analysis":"Análisis de presión","Build-Up Analysis":"Análisis de salida de balón","Data Interpretation":"Interpretación de datos",
    "Football Philosophy":"Filosofía de fútbol","Principles":"Principios","Relentless Pressure":"Presión constante",
    "Without the ball, the objective is to aggressively hunt possession. I favour intense man-to-man pressure, forcing opponents into uncomfortable situations and constantly searching for opportunities to regain the ball.":"Sin balón, el objetivo es recuperar la posesión de forma agresiva. Prefiero una presión intensa hombre a hombre, forzando al rival a situaciones incómodas y buscando constantemente oportunidades para recuperar el balón.",
    "Pressing should not be passive. The team actively searches for triggers and opportunities to attack the opponent’s possession. The mentality is: Pressing. Pressing. Pressing.":"La presión no debe ser pasiva. El equipo busca activamente detonantes y oportunidades para atacar la posesión rival. La mentalidad es: Presión. Presión. Presión.",
    "Freedom Within Structure":"Libertad dentro de la estructura",
    "In possession, I prefer freedom over overly rigid positional occupation. Players should be able to roam, rotate and leave their nominal positions when they recognise an advantage.":"En posesión, prefiero la libertad a una ocupación posicional excesivamente rígida. Los jugadores deben poder moverse, rotar y abandonar sus posiciones nominales cuando reconocen una ventaja.",
    "When one player leaves a space, another player should recognise the movement and occupy, protect or compensate for the resulting space. Structure exists to support freedom rather than restrict it.":"Cuando un jugador abandona un espacio, otro debe reconocer el movimiento y ocupar, proteger o compensar el espacio resultante. La estructura existe para apoyar la libertad, no para limitarla.",

    "For professional enquiries regarding tactical analysis, scouting or collaboration.":"Para consultas profesionales sobre análisis táctico, scouting o colaboración.",
    "Email":"Correo","Get in touch":"Ponte en contacto","Name":"Nombre","Organisation":"Organización","Subject":"Asunto","Message":"Mensaje","Send Message":"Enviar mensaje",

    "A tactical study of Paris Saint-Germain across the 2024/25 and 2025/26 seasons, exploring how Luis Enrique built a team capable of dominating Europe through pressing, fluid movement and collective organisation.":"Un estudio táctico del Paris Saint-Germain durante las temporadas 2024/25 y 2025/26, analizando cómo Luis Enrique construyó un equipo capaz de dominar Europa mediante presión, movimientos fluidos y organización colectiva.",
    "Introduction":"Introducción",
    "This analysis marks the beginning of a series looking at the UEFA Champions League winners of the past 20 years, with each edition focusing on the tactical identity and key principles behind a successful European campaign.":"Este análisis abre una serie sobre los campeones de la UEFA Champions League de los últimos 20 años. Cada entrega se centra en la identidad táctica y los principios clave detrás de una campaña europea exitosa.",
    "The series begins with Paris Saint-Germain and their remarkable period between 2024 and 2026. What makes this PSG side particularly interesting is not simply the success itself, but the level of dominance they were able to sustain across two consecutive seasons.":"La serie comienza con el Paris Saint-Germain y su extraordinario periodo entre 2024 y 2026. Lo especialmente interesante de este PSG no es solo el éxito, sino el nivel de dominio que logró mantener durante dos temporadas consecutivas.",
    "The central question of this analysis is therefore simple:":"La pregunta central de este análisis es sencilla:","How did PSG do it?":"¿Cómo lo consiguió el PSG?",
    "To answer that question, the analysis will look at the evolution of the team under Luis Enrique, their structures in possession and without the ball, the freedom and rotations within their attacking game, and the collective mechanisms that allowed those movements to function without losing balance.":"Para responderla, el análisis estudia la evolución del equipo con Luis Enrique, sus estructuras con y sin balón, la libertad y las rotaciones en ataque y los mecanismos colectivos que permitían esos movimientos sin perder el equilibrio.",
    "Both Champions League finals will then be examined individually, before bringing the different elements together to understand why this PSG side was able to remain at the top of European football across two seasons.":"Después se analizarán por separado las dos finales de Champions League antes de unir todos los elementos para entender por qué este PSG pudo mantenerse en la cima del fútbol europeo durante dos temporadas.",
    "The Evolution of PSG":"La evolución del PSG","Phase 1 — Building the Structure":"Fase 1 — Construcción de la estructura",
    "Your browser does not support the video tag.":"Tu navegador no admite la etiqueta de vídeo.",
    "In the early stages of Luis Enrique’s project, PSG played a highly controlled and positionally disciplined style of football. Players rarely exchanged positions freely, with the team instead maintaining clearly defined zones and a stable positional structure.":"En las primeras fases del proyecto de Luis Enrique, el PSG practicaba un fútbol muy controlado y disciplinado posicionalmente. Los jugadores apenas intercambiaban posiciones libremente y el equipo mantenía zonas claramente definidas y una estructura posicional estable.",
    "At this point, the priority was not yet to create the fluid and unpredictable PSG that would emerge later. Enrique first needed to build a functioning collective: establishing clear reference points in possession, teaching the players his positional principles and creating a shared understanding of how the team should occupy the pitch.":"En ese momento, la prioridad todavía no era crear el PSG fluido e imprevisible que aparecería después. Enrique necesitaba primero construir un colectivo funcional: establecer referencias claras en posesión, enseñar sus principios posicionales y crear una comprensión común de cómo debía ocupar el campo el equipo.",
    "This controlled structure provided the foundation for PSG’s later evolution. Once the players had internalised Enrique’s ideas and developed stronger relationships with one another, the team could gradually move away from rigid positioning and introduce the rotations, freedom and collective adaptations that would eventually become central to their identity.":"Esta estructura controlada sentó las bases de la evolución posterior del PSG. Una vez que los jugadores interiorizaron las ideas de Enrique y desarrollaron relaciones más fuertes entre ellos, el equipo pudo alejarse gradualmente de posiciones rígidas e introducir las rotaciones, la libertad y las adaptaciones colectivas que terminarían siendo centrales en su identidad.",
    "As the group developed, that began to change. PSG gradually became less rigid and more fluid. Players were given greater freedom to leave their positions, rotate with teammates and interpret space, because the team had developed the collective understanding required to compensate for those movements.":"A medida que el grupo evolucionó, eso empezó a cambiar. El PSG se volvió progresivamente menos rígido y más fluido. Los jugadores recibieron más libertad para abandonar sus posiciones, rotar con compañeros e interpretar los espacios, porque el equipo había desarrollado la comprensión colectiva necesaria para compensar esos movimientos.",
    "Several players became particularly important to that evolution. Ousmane Dembélé, Khvicha Kvaratskhelia, Nuno Mendes, Vitinha, Achraf Hakimi and Désiré Doué all had a major tactical influence on the team. Their specific roles will become clearer in the sections on PSG’s behaviour in and out of possession.":"Varios jugadores fueron especialmente importantes en esa evolución. Ousmane Dembélé, Khvicha Kvaratskhelia, Nuno Mendes, Vitinha, Achraf Hakimi y Désiré Doué tuvieron una gran influencia táctica. Sus funciones concretas se verán con mayor claridad en los apartados sobre el comportamiento del PSG con y sin balón.",
    "The 2024/25 season also represented a transition within the squad itself. Kvaratskhelia, for example, only arrived during the winter window, meaning the team that eventually won the Champions League was still developing during the season.":"La temporada 2024/25 también representó una transición dentro de la propia plantilla. Kvaratskhelia, por ejemplo, llegó en el mercado de invierno, lo que significa que el equipo que acabaría ganando la Champions todavía estaba evolucionando durante la temporada.",
    "By 2025/26, PSG were also able to manage their squad more deliberately around the Champions League. Key players such as Dembélé, Doué, Vitinha and Nuno Mendes were used less frequently in domestic competitions, allowing them to arrive fresher for the biggest European matches. At the same time, PSG retained their most important players while continuing to add depth to the squad.":"En 2025/26, el PSG pudo gestionar su plantilla de forma más deliberada pensando en la Champions League. Jugadores clave como Dembélé, Doué, Vitinha y Nuno Mendes participaron menos en las competiciones nacionales, llegando más frescos a los grandes partidos europeos. Al mismo tiempo, el PSG mantuvo a sus jugadores más importantes y siguió añadiendo profundidad a la plantilla.",
    "In Possession — From Structure to Freedom":"Con balón — De la estructura a la libertad",
    "Once PSG had established the positional foundations of Luis Enrique’s football, their possession game evolved into something far more fluid. The following sequences are":"Una vez que el PSG estableció las bases posicionales del fútbol de Luis Enrique, su juego de posesión evolucionó hacia algo mucho más fluido. Las siguientes secuencias son",
    "examples of recurring rotations":"ejemplos de rotaciones recurrentes",
    "rather than fixed patterns. The positions constantly changed, but the underlying principle remained the same: when one player moved away from his zone, another player occupied or protected the space that movement created.":"y no patrones fijos. Las posiciones cambiaban constantemente, pero el principio de fondo seguía siendo el mismo: cuando un jugador abandonaba su zona, otro ocupaba o protegía el espacio creado por ese movimiento.",
    "Right-Side Rotations":"Rotaciones por la derecha",
    "Much of PSG’s possession was developed through the right side. Dembélé could drop extremely deep on the right, drawing opponents away from the last line and becoming involved in the construction of the attack. His movement opened space ahead of him for Hakimi and, in this example, Doué to attack. Behind those rotations, Zaïre-Emery could cover the space vacated by Hakimi, allowing the right-back to advance without leaving the structure completely exposed.":"Gran parte de la posesión del PSG se desarrollaba por la derecha. Dembélé podía bajar muy atrás en ese costado, arrastrando rivales fuera de la última línea y participando en la construcción. Su movimiento abría espacio por delante para que Hakimi y, en este ejemplo, Doué lo atacaran. Detrás de esas rotaciones, Zaïre-Emery podía cubrir el espacio dejado por Hakimi, permitiendo al lateral avanzar sin dejar la estructura completamente expuesta.",
    "Vitinha, Nuno Mendes & the Left Side":"Vitinha, Nuno Mendes y el lado izquierdo",
    "Vitinha’s positioning was equally flexible. He could operate as the number six, but when Nuno Mendes moved high and occupied the left wing, Vitinha could drop into the left centre-back zone. In those situations, Fabián Ruiz or Zaïre-Emery could become the central midfielder at the base of the structure. Rather than relying on one fixed build-up shape, PSG continually redistributed responsibilities depending on the movement around the ball.":"La posición de Vitinha era igualmente flexible. Podía actuar como pivote, pero cuando Nuno Mendes avanzaba y ocupaba la banda izquierda, Vitinha podía caer a la zona de central izquierdo. En esas situaciones, Fabián Ruiz o Zaïre-Emery podían convertirse en el centrocampista central en la base de la estructura. En lugar de depender de una única forma de salida, el PSG redistribuía constantemente las responsabilidades según los movimientos alrededor del balón.",
    "Width Without Fixed Wingers":"Amplitud sin extremos fijos",
    "Kvaratskhelia often provided width on the left touchline, but even that role was not permanent. He could suddenly appear on the opposite touchline, just as Doué could move across the pitch. These exchanges made PSG difficult to reference defensively: the width remained, but the player providing it could change from one sequence to the next.":"Kvaratskhelia daba a menudo amplitud en la banda izquierda, pero ni siquiera ese rol era permanente. Podía aparecer de repente en la banda opuesta, al igual que Doué podía cruzar el campo. Estos intercambios dificultaban las referencias defensivas: la amplitud se mantenía, pero el jugador que la proporcionaba podía cambiar de una secuencia a otra.",
    "Occupying the Centre":"Ocupación del centro",
    "The rotations could create unusual attacking pictures. At times, Fabián Ruiz could become the only PSG player occupying the highest central zone while the nominal forwards moved elsewhere to create or attack space. What looked like positional freedom was therefore not simply random movement — the team continued to occupy the necessary spaces, only with different players filling them.":"Las rotaciones podían crear imágenes ofensivas poco habituales. En algunos momentos, Fabián Ruiz podía ser el único jugador del PSG ocupando la zona central más alta, mientras los delanteros nominales se movían a otras zonas para crear o atacar espacio. Por tanto, lo que parecía libertad posicional no era movimiento aleatorio: el equipo seguía ocupando los espacios necesarios, solo que con jugadores diferentes.",
    "Switching to the Weak Side":"Cambio hacia el lado débil",
    "Although PSG frequently progressed through the right, the opposite side remained a constant threat. When Nuno Mendes and Kvaratskhelia were isolated on the left, PSG could quickly switch the ball across the pitch and attack the space created by the opponent’s shift towards the right. The result was a possession structure built around overloads, rotations and rapid changes of the point of attack rather than fixed individual positions.":"Aunque el PSG progresaba con frecuencia por la derecha, el lado opuesto seguía siendo una amenaza constante. Cuando Nuno Mendes y Kvaratskhelia quedaban aislados a la izquierda, el PSG podía cambiar rápidamente el balón y atacar el espacio creado por el desplazamiento rival hacia la derecha. El resultado era una estructura de posesión basada en sobrecargas, rotaciones y cambios rápidos del punto de ataque, en lugar de posiciones individuales fijas.",
    "Without the Ball":"Sin balón",
    "Without the ball, PSG were just as aggressive and flexible as they were in possession. The following clip shows two examples of opposition build-up structures PSG regularly had to solve and how their man-oriented pressing adapted to both.":"Sin balón, el PSG era tan agresivo y flexible como en posesión. El siguiente clip muestra dos ejemplos de estructuras de salida rivales y cómo su presión orientada al hombre se adaptaba a ambas.",
    "Against a 4-4-2 Build-Up":"Contra una salida 4-4-2",
    "Against a 4-4-2, the opposition’s two forwards could drop very deep while the wide players stayed high. PSG responded with an extremely aggressive man-oriented approach: the centre-backs stepped forward onto the two strikers and were prepared to follow them even when they moved far away from the defensive line.":"Contra un 4-4-2, los dos delanteros rivales podían bajar muy atrás mientras los jugadores de banda permanecían altos. El PSG respondía con una orientación al hombre extremadamente agresiva: los centrales saltaban sobre los dos delanteros y estaban preparados para seguirlos incluso cuando se alejaban mucho de la línea defensiva.",
    "For most teams, committing centre-backs this aggressively would create major problems elsewhere. PSG could sustain it because the pressing system had become deeply internalised. Players were comfortable taking over different responsibilities as the structure changed, allowing one player to leave his nominal position while teammates adjusted and protected the spaces around him.":"Para la mayoría de equipos, comprometer a los centrales de forma tan agresiva generaría grandes problemas en otras zonas. El PSG podía sostenerlo porque el sistema de presión estaba profundamente interiorizado. Los jugadores asumían con naturalidad distintas responsabilidades cuando cambiaba la estructura, permitiendo que uno abandonara su posición nominal mientras sus compañeros ajustaban y protegían los espacios alrededor.",
    "Against a 4-3-3 Build-Up":"Contra una salida 4-3-3",
    "The same principle could be adapted against a 4-3-3. In the example shown, the left centre-back steps onto the opposition striker, the right centre-back moves out towards the right winger, and the right-back jumps forward onto the opposition right-back. PSG’s defensive line therefore did not simply protect its own zones — individual defenders could leave the line and take responsibility for opponents much higher up the pitch.":"El mismo principio podía adaptarse contra un 4-3-3. En el ejemplo, el central izquierdo salta sobre el delantero rival, el central derecho sale hacia el extremo derecho y el lateral derecho salta sobre el lateral derecho rival. Por tanto, la línea defensiva del PSG no se limitaba a proteger sus propias zonas: los defensores podían abandonar la línea y asumir responsabilidades sobre rivales mucho más arriba.",
    "This required enormous collective understanding. The pressing structure could change within seconds, but because players were capable of covering different positions and responsibilities, PSG could maintain pressure without abandoning the overall organisation.":"Esto exigía una enorme comprensión colectiva. La estructura de presión podía cambiar en segundos, pero como los jugadores podían cubrir distintas posiciones y responsabilidades, el PSG mantenía la presión sin abandonar la organización general.",
    "Forcing Play Away from the Centre":"Alejar el juego del centro",
    "The final seconds of the clip highlight an important detail in the forwards’ pressing. Rather than running directly towards the centre-backs, PSG’s forwards approached from the inside and curved their runs outwards. Their first objective was to close the passing lane into central areas; only then did they accelerate towards the centre-back.":"Los últimos segundos del clip muestran un detalle importante en la presión de los delanteros. En lugar de correr directamente hacia los centrales, los atacantes del PSG llegaban desde dentro y curvaban sus carreras hacia fuera. Su primer objetivo era cerrar la línea de pase hacia zonas centrales; solo después aceleraban hacia el central.",
    "This meant the press was not based on intensity alone. PSG used the angle of the run to remove the opponent’s preferred inside option, guide the build-up towards the outside and then attack the ball. The aggression of the press was therefore supported by a clear understanding of which spaces PSG wanted to protect and which passes they were willing to allow.":"Esto significa que la presión no se basaba únicamente en la intensidad. El PSG utilizaba el ángulo de la carrera para eliminar la opción interior preferida del rival, guiar la salida hacia fuera y después atacar el balón. La agresividad de la presión estaba respaldada por una comprensión clara de qué espacios quería proteger y qué pases estaba dispuesto a permitir.",
    "2025 Champions League Final":"Final de la Champions League 2025","2025/26: Defending the Crown":"2025/26: Defendiendo la corona",
    "2026 Champions League Final":"Final de la Champions League 2026","Why This Team Worked":"Por qué funcionó este equipo","Conclusion":"Conclusión","← Back to all analyses":"← Volver a todos los análisis"
  }
};

const pageTitleTranslations = {
  de: {
    "SPMaurice — Football Tactical Analysis & Scouting":"SPMaurice — Fußball-Taktikanalyse & Scouting",
    "Analysis — SPMaurice":"Analysen — SPMaurice","Scouting — SPMaurice":"Scouting — SPMaurice",
    "About — SPMaurice":"Über mich — SPMaurice","Contact — SPMaurice":"Kontakt — SPMaurice","PSG 2024–26 — SPMaurice":"PSG 2024–26 — SPMaurice"
  },
  es: {
    "SPMaurice — Football Tactical Analysis & Scouting":"SPMaurice — Análisis táctico & Scouting",
    "Analysis — SPMaurice":"Análisis — SPMaurice","Scouting — SPMaurice":"Scouting — SPMaurice",
    "About — SPMaurice":"Sobre mí — SPMaurice","Contact — SPMaurice":"Contacto — SPMaurice","PSG 2024–26 — SPMaurice":"PSG 2024–26 — SPMaurice"
  }
};

const originalTitle = document.title;
const translatableTextNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    if (!node.parentElement || ['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
    const key = node.nodeValue.trim();
    if (!key) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }
});
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  const raw = node.nodeValue;
  const key = raw.trim();
  translatableTextNodes.push({
    node,
    key,
    leading: raw.match(/^\s*/)?.[0] || '',
    trailing: raw.match(/\s*$/)?.[0] || ''
  });
}

const langSwitcher = document.createElement('div');
langSwitcher.className = 'lang-switcher';
langSwitcher.setAttribute('aria-label', 'Language');
langSwitcher.innerHTML = '<button type="button" data-lang="en">EN</button><button type="button" data-lang="de">DE</button><button type="button" data-lang="es">ES</button>';
const navWrap = document.querySelector('.nav-wrap');
const navToggle = document.querySelector('.nav-toggle');
if (navWrap) navWrap.insertBefore(langSwitcher, navToggle || navWrap.lastChild);

function applyLanguage(lang) {
  const dict = translations[lang] || {};
  translatableTextNodes.forEach(({node,key,leading,trailing}) => {
    node.nodeValue = leading + (lang === 'en' ? key : (dict[key] || key)) + trailing;
  });
  document.documentElement.lang = lang;
  document.title = lang === 'en' ? originalTitle : (pageTitleTranslations[lang]?.[originalTitle] || originalTitle);
  document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  localStorage.setItem('spmaurice-language', lang);
}

langSwitcher.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));
applyLanguage(localStorage.getItem('spmaurice-language') || 'en');
