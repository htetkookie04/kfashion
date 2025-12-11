import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { mockEvents } from '../data/mockContent';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';

export function EventsPage() {
  const [events] = useState(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage platform events and activities
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {event.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{event.registeredUsers} / {event.maxParticipants} registered</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(event.registeredUsers / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {((event.registeredUsers / event.maxParticipants) * 100).toFixed(0)}% full
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Event"
      >
        <div className="space-y-4">
          <Input label="Event Title" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
            />
          </div>
          <Input label="Location" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
          </div>
          <Input label="Max Participants" type="number" />
          <div className="flex gap-4 mt-6">
            <Button variant="primary" className="flex-1">Create Event</Button>
            <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
