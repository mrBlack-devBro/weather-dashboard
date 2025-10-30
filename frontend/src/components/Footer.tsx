const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-5">
      <div className="container mx-auto px-6 text-center">
        <p className="text-muted-foreground text-sm">
          © {currentYear} Weather App by{" "}
          <span className="font-medium text-foreground">Adefela Adeseyoju</span>.{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
