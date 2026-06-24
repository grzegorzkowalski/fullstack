export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Błąd walidacji',
        details: result.error.issues.map((issue) => ({
          pole: issue.path.join('.'),
          komunikat: issue.message,
        })),
      });
    }

    req.body = result.data; // dane po walidacji (i ewentualnej transformacji Zod)
    next();
  };
}
