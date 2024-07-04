/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../../../../src/pages/Profile';
import { describe, it, expect, beforeEach } from 'vitest';
import { UserProvider } from '../../../../src/contexts/UserContext'

interface User {
    correo: string,
    nombre: string,
    rut: string,
    apellido: string,
    tocken: string,
    rol: {
        id: number,
        nombre: string
    },
    clinica: {
        nombreFantasia: string,
        razonSocial: string,
        rut: string
    },
    urls: { name: string; urls: { title: string; url: string; }[]; }[]
}

describe('Profile Component', () => {

    let user: User | null = null;

    beforeEach(() => {
        render(
          <UserProvider initialSession={user}>
            <Profile />
          </UserProvider>
        );
      });

    it('renders UserData', () => {
        expect(screen.getByText('Perfil de Usuario')).toBeTruthy();
        expect(screen.getByText('Nombre')).toBeTruthy();
        expect(screen.getByPlaceholderText('Joe')).toBeTruthy();
        expect(screen.getByText('Apellido')).toBeTruthy();
        expect(screen.getByPlaceholderText('Doe')).toBeTruthy();
        expect(screen.getByText('RUT')).toBeTruthy();
        expect(screen.getByPlaceholderText('RUT')).toBeTruthy();
    });

    it('renders UserAcc', () => {
        expect(screen.getByText('Configuración de Cuenta')).toBeTruthy();
        expect(screen.getByText('Correo')).toBeTruthy();
        expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
        expect(screen.getByLabelText('Clinica')).toBeTruthy();
        expect(screen.getByPlaceholderText('PetVet')).toBeTruthy();
        expect(screen.getByLabelText('Rol')).toBeTruthy();
        expect(screen.getByPlaceholderText('rol')).toBeTruthy();
    });

    it('renders ChangePass', () => {
        expect(screen.getByText('Cambiar Contraseña')).toBeTruthy();
        expect(screen.getByText('Contraseña')).toBeTruthy();
        expect(screen.getByText('Nueva contraseña')).toBeTruthy();
        expect(screen.getByText('Repetir nueva contraseña')).toBeTruthy();
    });
});
