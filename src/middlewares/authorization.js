const authorization = (roles = []) => {
  return (req, res, next) => {
    console.log('req.user:', req.user);
    console.log('roles permitidos:', roles);

    if(!req.user){
      return res.status(401).json({ status: 'error', message: 'Usuario no autenticado' });
    }

    if(!roles.includes(req.user.role)){
      return res.status(403).json({ status: 'error', message: 'No tienes permiso para realizar esta acción' });
    }

    next()
  }
}

export default authorization;