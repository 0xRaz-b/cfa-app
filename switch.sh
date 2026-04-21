#!/bin/bash
echo "Quelle app veux-tu charger ?"
echo "1) Part 1 - Taux d'intérêt"
echo "2) Part 2 - Rendements & Moyennes"
read -p "Ton choix (1 ou 2): " choice

if [ "$choice" = "1" ]; then
  echo "import CFAApp from './rate-and-return'" > src/App.jsx
  echo "export default function App() { return <CFAApp /> }" >> src/App.jsx
  echo "✅ Part 1 chargée !"
elif [ "$choice" = "2" ]; then
  echo "import CFAApp from './cfa-returns-means'" > src/App.jsx
  echo "export default function App() { return <CFAApp /> }" >> src/App.jsx
  echo "✅ Part 2 chargée !"
else
  echo "❌ Choix invalide"
fi