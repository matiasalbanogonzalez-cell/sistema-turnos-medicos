describe("Turnos", () => {
  test("Debe crear un objeto turno correctamente", () => {
    const turno = {
      paciente: "Juan Perez",
      profesionalId: "1",
      especialidad: "Cardiología",
      fecha: "2026-06-20",
      hora: "10:00",
      obraSocial: "OSDE",
      estado: "pendiente"
    };

    expect(turno.estado).toBe("pendiente");
    expect(turno.obraSocial).toBe("OSDE");
  });
});