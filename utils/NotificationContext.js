import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const loadNotificationSettings = async () => {
      try {
        const savedNotificationsSetting = await AsyncStorage.getItem('notifications');
        setNotificationsEnabled(savedNotificationsSetting === 'enabled');
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };

    loadNotificationSettings();
  }, []);

  const toggleNotifications = async () => {
    const newSetting = notificationsEnabled ? 'disabled' : 'enabled';
    setNotificationsEnabled(!notificationsEnabled);
    try {
      await AsyncStorage.setItem('notifications', newSetting);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notificationsEnabled, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationSettings = () => useContext(NotificationContext);
