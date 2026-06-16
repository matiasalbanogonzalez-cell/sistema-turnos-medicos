describe("Profesionales", () => {
  test("Debe contener una especialidad", () => {
    const profesional = {
      nombre: "Dr. Matias Pérez",
      especialidad: "Neurología"
    };

    expect(profesional.especialidad).toBe("Neurología");
  });
});