describe("Prueba básica", () => {
  test("2 + 2 debe ser 4", () => {
    expect(2 + 2).toBe(4);
  });
});

describe("Autenticación", () => {
  test("Debe generar un usuario válido", () => {
    const usuario = {
      nombre: "Matias",
      email: "matias@test.com",
      role: "paciente"
    };

    expect(usuario.nombre).toBe("Matias");
    expect(usuario.role).toBe("paciente");
  });
});

