body {
  margin: 0;
  padding: 2rem;
  background-color: #d0f0ec;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
}

h1 {
  text-align: center;
  color: #005a73;
}

.malla {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.semestre {
  background-color: #a0dcd7;
  padding: 1rem;
  border-radius: 10px;
  min-width: 200px;
}

.semestre h3 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.ramos {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ramo {
  width: 150px;
  height: 90px;
  perspective: 1000px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.ramo.disabled {
  opacity: 0.3;
  pointer-events: none;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  background-color: #92cce8;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  text-align: center;
  color: #000;
  user-select: none;
}

.ramo:hover .card {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  text-align: center;
  line-height: 1.3;
}

.card-back {
  transform: rotateY(180deg);
  font-size: 8px;
  background-color: #92cce8;
  color: #000;
  white-space: pre-line;
}

.card.aprobado {
  background-color: #3a6ea5 !important;
  color: white !important;
  box-shadow: 0 0 10px #2b4c73;
}

.card.aprobado .card-front {
  text-decoration: line-through;
  color: white !important;
}
