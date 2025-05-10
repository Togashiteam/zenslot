import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Horários disponíveis (exemplo)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime) {
      // Atualiza o horário para indisponível
      setTimeSlots(timeSlots.map(slot =>
        slot.time === selectedTime ? { ...slot, available: false } : slot
      ));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Agendamento de Horários
        </h1>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Escolha a data:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-2 border rounded-md"
            minDate={new Date()}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Horários disponíveis:</label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                className={`p-3 rounded-md text-center ${
                  slot.available
                    ? selectedTime === slot.time
                      ? 'bg-blue-500 text-white'
                      : 'bg-green-100 hover:bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={!selectedTime}
            className={`w-full py-2 px-4 rounded-md text-white ${
              selectedTime
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar Agendamento
          </button>
        </form>

        {showSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            Agendamento realizado com sucesso para {selectedTime}!
          </div>
        )}
      </div>
    </div>
  );
}